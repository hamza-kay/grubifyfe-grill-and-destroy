"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppIdContext = createContext(null);

export function AppIdProvider({ children }) {
  const [appId, setAppId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const envAppId = process.env.NEXT_PUBLIC_APP_ID_KEY;

    if (envAppId) {
      console.log("✅ Loaded appId from .env:", envAppId);
      setAppId(envAppId);
    } else {
      console.warn("⚠️ NEXT_PUBLIC_APP_ID_KEY is not defined in .env");
    }

    setLoading(false);
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
