"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const router = useRouter();

  // Optional: auto-redirect home after 5s
  useEffect(() => {
    const t = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
      <h1 className="text-green-600 text-2xl font-bold mb-3">✅ Order Complete</h1>
      <p className="text-gray-700">We’ll start preparing it shortly.</p>
      <p className="text-gray-500 text-sm mt-4">Redirecting to home…</p>
      <Button onClick={() => router.push("/")} variant="outline" className="w-full mt-6">
        Back to Home
      </Button>
    </main>
  );
}
