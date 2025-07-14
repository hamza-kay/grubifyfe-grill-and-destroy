"use client";

import { useAppId } from "@/components/AppIdProvider";
import MenuLoader from "@/components/MenuLoader";
import Link from "next/link";

export default function HomePage() {
  const { loading } = useAppId();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <MenuLoader />

      <div className="mt-10 flex justify-center">

      </div>
    </main>
  );
}
