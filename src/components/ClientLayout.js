"use client";

import { AppIdProvider } from "@/components/AppIdProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();



export default function ClientLayout({ children }) {
  return (
    <AppIdProvider>
    <QueryClientProvider client={queryClient}>
 {children}
</QueryClientProvider>
</AppIdProvider>
  );
}
