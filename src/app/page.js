"use client";

import SectionsLoader from "@/components/SectionsLoader";
import MenuLoader from "@/components/MenuLoader";
import { fetchMenuData, fetchSectionItems } from "@/utils/api";
import { useAppId } from "@/components/AppIdProvider";
import { useEffect, useState } from "react";
import ItemModal from "@/components/ItemModal";

export default function HomePage() {
  const { appId, loading } = useAppId();
  const [menuId, setMenuId] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!loading && appId) {
      fetchMenuData(appId)
        .then((data) => {
          console.log("Fetched menu data:", data);
          setMenuId(data.id);
        })
        .catch((e) => console.error(e));
    }
  }, [loading, appId]);

  const handleSectionSelect = (sectionId) => {
    if (!loading && appId) {
      fetchSectionItems(sectionId, appId)
        .then((data) => {
          console.log("Fetched items:", data);
          setItems(data);
        })
        .catch((e) => console.error(e));
    }
  };

  console.log("HomePage render:", { menuId, appId, loading });

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

      {items.length > 0 ? (
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

      {/* ✅ ✅ THIS IS THE MISSING PIECE! */}
      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </main>
  );
}
