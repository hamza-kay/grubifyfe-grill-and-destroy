"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retries = 3;

    const fetchHeader = async () => {
      try {
        const response = await fetch(window.location.origin, {
          cache: "no-store",
        });
        if (response.ok) {
          const header = response.headers.get("x-app-id");
          if (header) {
            console.log("Fetched dynamic appId:", header);
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

      // Retry logic
      if (retries < 5) {
        retries++;
        setTimeout(fetchHeader, 500);
      } else {
        console.error("Max retries reached. Using fallback appId in dev.");
        // Use fallback only in development
        if (!header) {
          const devAppId =
            "aXrbtQ3AXaSFWyWt:jQ==:VS5GLVMVDg2muDpEPIAiJQ=="; // your real dev App ID
          console.log("Using fallback dev appId:", devAppId);
          setAppId(devAppId);
        }
        setLoading(false);
      }
    };

    fetchHeader();
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
