"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppId } from "@/components/AppIdProvider";
import SectionsLoader from "@/components/SectionsLoader";
import MenuLoader from "@/components/MenuLoader";
import { fetchMenuData, fetchSectionItems } from "@/utils/api";
import { useState } from "react";
import ItemModal from "@/components/ItemModal";
import ShoppingCart from "@/components/ShoppingCart";
import Link from "next/link";




export default function HomePage() {
  const { appId, loading } = useAppId();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  // ✅ fetchMenuData
  const {
    data: menuData,
    isLoading: isLoadingMenu,
    isError: isErrorMenu,
  } = useQuery({
    queryKey: ["menuData", appId],
    queryFn: () => fetchMenuData(appId),
    enabled: !!appId && !loading,
  });

  const menuId = menuData?.id;

  // ✅ fetchSectionItems
  const {
    data: items = [],
    isLoading: isLoadingItems,
    isError: isErrorItems,
  } = useQuery({
    queryKey: ["sectionItems", selectedSection, appId],
    queryFn: () => fetchSectionItems(selectedSection, appId),
    enabled: !!selectedSection && !!appId && !loading,
  });

  const handleSectionSelect = (sectionId) => {
    console.log("Section clicked:", sectionId);
    setSelectedSection(sectionId);
  };

  console.log("HomePage render:", { menuId, appId, loading, selectedSection });

  if (loading || isLoadingMenu) return <div>Loading menu...</div>;
  if (isErrorMenu) return <div>Error loading menu.</div>;

  return (
    <main>
      {menuId ? (
        <SectionsLoader
          menuId={menuId}
          onSectionSelect={handleSectionSelect}
        />
      ) : (
        <p>Loading menu...</p>
      )}

      <MenuLoader />

      <h3>Items in Section</h3>

      {isLoadingItems ? (
        <p>Loading items...</p>
      ) : isErrorItems ? (
        <p>Error loading items.</p>
      ) : items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span
                style={{ cursor: "pointer", color: "dodgerblue" }}
                onClick={() => {
                  console.log("Clicked item:", item);
                  setSelectedItem(item);
                }}
              >
                {item.name} - £
                {item.price?.toFixed(2) ??
                  (item.sizes
                    ? Object.values(item.sizes)[0]?.toFixed(2)
                    : "N/A")}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Select a section to load items.</p>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}


      <Link href="/cart">View Cart</Link>
  
    </main>
  );
}
