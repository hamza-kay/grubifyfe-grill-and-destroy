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
import MenuItem from "@/components/MenuItem";
import ItemModal from "@/components/ItemModal";
import { useState } from "react";

export default function MenuLoader() {
  const { appId, loading } = useAppId();
  const [selectedItem, setSelectedItem] = useState(null);

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

  const {
    data: sections = [],
    isLoading: isLoadingSections,
    isError: isErrorSections,
  } = useQuery({
    queryKey: ["sections", menuId, appId],
    enabled: !!menuId && !!appId,
    queryFn: () => fetchSections(menuId, appId),
  });

  const {
    data: allSectionItems = [],
    isLoading: isLoadingSectionItems,
    isError: isErrorSectionItems,
  } = useQuery({
    queryKey: ["allSectionItems", sections, appId],
    queryFn: () =>
      Promise.all(
        sections.map((section) =>
          fetchSectionItems(section.id, appId).then((items) => ({
            sectionId: section.id,
            sectionTitle: section.title,
            items,
          }))
        )
      ),
    enabled: sections.length > 0 && !!appId,
  });

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
          onClick={() => window.location.reload()}
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
        {/* Scrollable section links */}
        <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-2 mb-6">
          {sections.map((section) => (
     <a
  key={section.id}
  onClick={() => {
    document
      .getElementById(`section-${section.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}
  className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
>
  {section.title}
</a>

          ))}
        </div>

        {/* Render all sections */}
        {allSectionItems.map((section) => (
          <div key={section.sectionId} id={`section-${section.sectionId}`} className="mb-10">
            <h3 className="text-xl font-semibold mb-4">
              {section.sectionTitle}
            </h3>

            {section.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
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
              <p className="text-gray-500">
                No items found in this section.
              </p>
            )}
          </div>
        ))}

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
