"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const devAppId = process.env.NEXT_PUBLIC_DEV_APP_ID;
  

useEffect(() => {
  const maxRetries = 3;

  const fetchHeader = async (attempt = 1) => {
    try {
      const response = await fetch(window.location.origin, {
        cache: "no-store",
      });
console.log('header >>>>>' . header);
      if (response.ok) {
        const header = response.headers.get("x-app-id");
        
        if (header) {
          setAppId(header);
          setLoading(false);
          return;
        } else {
          console.warn("x-app-id header not found. Retrying...");
        }
      } else {
        console.error("Failed to fetch app ID.");
      }
    } catch (e) {
      console.error("Error fetching app ID:", e);
    }

    if (attempt < maxRetries) {
      setTimeout(() => fetchHeader(attempt + 1), 500);
    } else {
      console.error("Max retries reached. Using fallback appId in dev.");
      if (process.env.NODE_ENV === "development") {
        console.log("Using fallback dev appId:", devAppId);
        setAppId(devAppId);
      }
      setLoading(false);
    }
  };

  fetchHeader();
}, [devAppId]);


  return (
    <AppIdContext.Provider value={{ appId, loading }}>
      {children}
    </AppIdContext.Provider>
  );
}

export function useAppId() {
  return useContext(AppIdContext);
}
