"use client";

import { AppIdProvider } from "@/components/AppIdProvider";


export default function ClientLayout({ children }) {
  return (
<AppIdProvider>
 {children}
</AppIdProvider>

  );
}
