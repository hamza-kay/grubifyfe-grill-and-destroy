"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppId } from "@/components/AppIdProvider";
import { fetchSections } from "@/utils/api";

export default function SectionsLoader({ menuId, onSectionSelect }) {
  const { appId, loading } = useAppId();

  // ✅ EARLY RETURN if AppId not ready
  if (loading || !appId || !menuId) {
    return <div>Loading sections...</div>;
  }

  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sections", menuId, appId],
    queryFn: () => fetchSections(menuId, appId),
    enabled: !!menuId && !!appId,
  });

  if (isLoading) return <div>Loading sections...</div>;
  if (isError) return <div>Error loading sections.</div>;

  console.log("SectionsLoader loaded sections:", sections);

  return (
    <div>
      <h3>Sections Loaded!</h3>
      <pre>{JSON.stringify(sections, null, 2)}</pre>
      {sections?.map((section) => (
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
