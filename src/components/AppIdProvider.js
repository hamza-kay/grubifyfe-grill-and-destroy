"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const devAppId = process.env.NEXT_PUBLIC_DEV_APP_ID;
  

useEffect(() => {
  const fetchAppId = async () => {
    try {
      const res = await fetch("/", {
        method: "GET",
        cache: "no-store", // ensure fresh request
      });

      const appId = res.headers.get("x-app-id");

      if (appId) {
        setAppId(appId);
      } else {
        console.warn("x-app-id not found in root response.");
      }
    } catch (error) {
      console.error("Failed to fetch x-app-id:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAppId();
}, []);



  return (
    <AppIdContext.Provider value={{ appId, loading }}>
      {children}
    </AppIdContext.Provider>
  );
}

export function useAppId() {
  return useContext(AppIdContext);
}
