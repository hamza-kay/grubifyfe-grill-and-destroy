"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppId } from "@/components/AppIdProvider";
import {
  fetchRestaurantData,
  fetchSections,
  fetchSectionItems,
} from "@/utils/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as Tabs from "@radix-ui/react-tabs";
import ItemModal from "@/components/ItemModal";
import MenuItem from "@/components/MenuItem";
import { useState, useMemo } from "react";

export default function MenuLoader() {
  const { appId, loading } = useAppId();
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState("all");

  // ✅ Fetch restaurant data
  const {
    data: restaurantData,
    isLoading: isLoadingRestaurant,
    isError: isErrorRestaurant,
  } = useQuery({
    queryKey: ["restaurantData", appId],
    enabled: !!appId && !loading,
    queryFn: () => fetchRestaurantData(appId),
  });

  const menuId = restaurantData?.id;

  // ✅ Fetch sections
  const {
    data: sections = [],
    isLoading: isLoadingSections,
    isError: isErrorSections,
  } = useQuery({
    queryKey: ["sections", menuId, appId],
    enabled: !!menuId && !!appId,
    queryFn: () => fetchSections(menuId, appId),
  });

  // ✅ Fetch items for active section
  const {
    data: sectionItems = [],
    isLoading: isLoadingSectionItems,
    isError: isErrorSectionItems,
    refetch: refetchSectionItems,
  } = useQuery({
    queryKey: ["sectionItems", activeSectionId, appId],
    queryFn: () =>
      activeSectionId === "all"
        ? Promise.all(
            sections.map((s) =>
              fetchSectionItems(s.id, appId)
            )
          ).then((all) => all.flat())
        : fetchSectionItems(activeSectionId, appId),
    enabled: !!activeSectionId && !!appId,
  });

  // ✅ Compute active section title
  const activeSectionTitle = useMemo(() => {
    if (activeSectionId === "all") return "All Menu Items";
    return (
      sections.find(
        (s) => s.id.toString() === activeSectionId
      )?.title || ""
    );
  }, [activeSectionId, sections]);

  if (
    loading ||
    isLoadingRestaurant ||
    isLoadingSections ||
    isLoadingSectionItems
  ) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-64 bg-gray-100 animate-pulse rounded"
            />
          ))}
        </div>
      </main>
    );
  }

  if (
    isErrorRestaurant ||
    isErrorSections ||
    isErrorSectionItems
  ) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-red-600 mb-4">
          Error loading menu.
        </p>
        <button
          onClick={() => refetchSectionItems()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <>
      <Header title={restaurantData?.title || "Menu"} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ✅ Tabs UI */}
        <Tabs.Root
          value={activeSectionId}
          onValueChange={(val) => setActiveSectionId(val)}
        >
          <Tabs.List className="flex flex-wrap gap-3 border-b border-gray-200 pb-2 mb-6">
            <Tabs.Trigger
              value="all"
              className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
            >
              All
            </Tabs.Trigger>
            {sections.map((section) => (
              <Tabs.Trigger
                key={section.id}
                value={section.id.toString()}
                className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
              >
                {section.title}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>

        <h3 className="text-xl font-semibold mb-4">
          {activeSectionTitle}
        </h3>

        {sectionItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer"
              >
                <MenuItem item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            No items found in this section.
          </p>
        )}

        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
