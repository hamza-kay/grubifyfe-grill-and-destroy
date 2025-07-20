"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);
  const devAppId = process.env.NEXT_PUBLIC_DEV_APP_ID;

  useEffect(() => {
    const maxRetries = 3;

    const fetchAppId = async (attempt = 1) => {
      try {
        const response = await fetch("/favicon.ico", {
          method: "GET",
          cache: "no-store",
        });

        console.log("📥 Favicon response:", response);

        const header = response.headers.get("X-App-Id");
        console.log("🔍 Extracted X-App-Id:", header);

        if (header) {
          // ✅ Add slight delay before setting appId
          setTimeout(() => {
            setAppId(header);
            setLoading(false);
            console.log("✅ AppId set (delayed):", header);
          }, 100); // 100ms delay
          return;
        } else {
          console.warn("⚠️ x-app-id header not found. Retrying...");
        }
      } catch (e) {
        console.error("❌ Error fetching x-app-id:", e);
      }

      if (attempt < maxRetries) {
        setTimeout(() => fetchAppId(attempt + 1), 500);
      } else {
        console.error("❌ Max retries reached. Using fallback appId in dev.");
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Using fallback dev appId:", devAppId);
          setAppId(devAppId);
        }
        setLoading(false);
      }
    };

    fetchAppId();
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
