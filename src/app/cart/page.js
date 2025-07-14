"use client";

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ShoppingCart from "@/components/ShoppingCart";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Your Cart</h1>

      <ShoppingCart />


    </main>
  );
}
