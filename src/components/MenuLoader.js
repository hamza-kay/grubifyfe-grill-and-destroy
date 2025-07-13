"use client";

import { useAppId } from "@/components/AppIdProvider";
import { useEffect, useState } from "react";
import { fetchMenuData } from "@/utils/api";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function MenuLoader() {
  const { appId, loading } = useAppId();
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && appId) {
      fetchMenuData(appId)
        .then((data) => setMenuData(data))
        .catch((e) => {
          console.error(e);
          setError(e);
        });
    }
  }, [appId, loading]);

  if (loading) return <div>Loading app ID...</div>;
  if (error) return <div>Error loading menu.</div>;
  if (!menuData) return <div>Loading menu...</div>;

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
