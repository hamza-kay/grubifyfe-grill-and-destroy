"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function CompletePage() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState("checking"); // "checking" | "success" | "error"

  useEffect(() => {
    // Clear cart on success
    clearCart();
    setStatus("success");
  }, [clearCart]);

  if (status === "checking") {
    return <main>Checking payment...</main>;
  }

  if (status === "error") {
    return <main>Payment failed. Please try again.</main>;
  }

  return (
    <main>
      <h1>✅ Order Complete!</h1>
      <p>Thank you for your order. We’ll get started preparing it right away.</p>
    </main>
  );
}
