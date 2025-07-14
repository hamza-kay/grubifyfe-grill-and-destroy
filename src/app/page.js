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
        <Link
          href="/cart"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          View Cart
        </Link>
      </div>
    </main>
  );
}
