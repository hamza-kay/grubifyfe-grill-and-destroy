"use client";

import { useCartStore } from "@/store/useCartStore";

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header>
      <div>
        <span>Cart Items: {totalItems}</span>
      </div>
    </header>
  );
}
