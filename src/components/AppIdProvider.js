"use client";
import { createContext, useContext, useState } from "react";

const AppIdContext = createContext(null);

const envAppId = process.env.NEXT_PUBLIC_APP_ID_KEY;

export function AppIdProvider({ children }) {
  // ✅ Skip loading state completely
  return (
    <AppIdContext.Provider value={{ appId: envAppId, loading: false }}>
      {children}
    </AppIdContext.Provider>
  );
}

export function useAppId() {
  return useContext(AppIdContext);
}
