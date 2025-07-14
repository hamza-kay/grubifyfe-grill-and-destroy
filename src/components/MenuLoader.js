"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppId } from "@/components/AppIdProvider";
import { fetchMenuData } from "@/utils/api";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function MenuLoader() {
  const { appId, loading } = useAppId();

  const {
    data: menuData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menuData", appId],
    queryFn: () => fetchMenuData(appId),
    enabled: !!appId && !loading,
  });

  if (loading || isLoading) return <div>Loading menu...</div>;

  if (isError) {
    console.error(error);
    return <div>Error loading menu.</div>;
  }

  if (!menuData) return <div>No menu data found.</div>;

  return (
    <>
      <Header title={menuData.title} />
      <main>
        <pre>{JSON.stringify(menuData, null, 2)}</pre>
        <Menu items={menuData.items || []} />
      </main>
    </>
  );
}
