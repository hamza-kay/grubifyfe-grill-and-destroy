"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const devAppId = "aXrbtQ3AXaSFWyWt:jQ==:VS5GLVMVDg2muDpEPIAiJQ=="; // fallback dev App ID
    let retries = 0;
    const maxRetries = 3;

    const fetchHeader = async () => {
      try {
        const response = await fetch(window.location.origin, {
          cache: "no-store",
        });

        const header = response.headers.get("x-app-id");

        if (response.ok && header) {
          console.log("✅ Fetched dynamic appId:", header);
          setAppId(header);
          setLoading(false);
          return;
        }

        console.warn("⚠️ x-app-id not found in headers. Retrying...");
      } catch (err) {
        console.error("❌ Error fetching appId:", err);
      }

      if (retries < maxRetries) {
        retries++;
        setTimeout(fetchHeader, 500);
      } else {
        console.warn("⏱️ Max retries reached. Falling back to devAppId.");
        setAppId(devAppId);
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
