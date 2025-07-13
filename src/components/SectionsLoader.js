"use client";

import { useAppId } from "@/components/AppIdProvider";
import { useEffect, useState } from "react";
import { fetchSections } from "@/utils/api";

export default function SectionsLoader({ menuId, onSectionSelect }) {
  const { appId, loading } = useAppId();
  const [sections, setSections] = useState([]);

  console.log("SectionsLoader props:", { menuId, appId, loading });

  useEffect(() => {
    if (!loading && appId && menuId) {
      console.log("Fetching sections for menuId:", menuId);

      fetchSections(menuId, appId)
        .then((data) => {
          console.log("Sections API response:", data);
          console.log("First section object:", data[0]);
          setSections(data);
        })
        .catch((e) => console.error("Error fetching sections:", e));
    }
  }, [loading, appId, menuId]);

  if (loading) return <div>Loading sections...</div>;

  return (
    <div>
      <h3>Sections Loaded!</h3>
      <pre>{JSON.stringify(sections, null, 2)}</pre>
      {sections.map((section) => (
        <div
          key={section.id}
          style={{
            cursor: "pointer",
            padding: "8px 0",
            fontWeight: "bold",
            color: "dodgerblue",
          }}
          onClick={() => onSectionSelect(section.id)}
        >
          ID: {section.id} — TITLE: {section.title || section.name || "N/A"}
        </div>
      ))}
    </div>
  );
}
