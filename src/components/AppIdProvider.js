"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const devAppId = process.env.NEXT_PUBLIC_DEV_APP_ID;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const fallback = "aXrbtQ3AXaSFWyWt:jQ==:VS5GLVMVDg2muDpEPIAiJQ==";
      console.log("⏳ Using hardcoded appId in dev after delay...");
      
      // Add a 100ms delay before setting the appId
      setTimeout(() => {
        setAppId(fallback);
        setLoading(false);
        console.log("✅ Hardcoded appId set:", fallback);
      }, 100);

      return;
    }

    // If needed, keep this for production
    const fetchAppId = async () => {
      try {
        const response = await fetch("/favicon.ico", {
          method: "GET",
          cache: "no-store",
        });

        const header = response.headers.get("x-app-id");

        if (header) {
          setAppId(header);
        } else {
          console.warn("⚠️ x-app-id header not found.");
        }
      } catch (e) {
        console.error("❌ Error fetching x-app-id:", e);
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
