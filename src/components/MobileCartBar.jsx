"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function MobileCartBar() {
  const totalItems = useCartStore((state) => state.totalItems());
  const totalAmount = useCartStore((state) => state.totalPrice("other"));

  if (totalItems === 0) return null;

  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50 flex items-center justify-between">
      {/* Quantity Button */}
      <div className="flex items-center justify-center text-sm font-semibold text-gray-800">
        {totalItems}
      </div>

      {/* Button */}
      <Link
        href="/cart"
        className="mx-3 bg-[var(--color-accent)] hover:bg-[#B00020] text-white text-sm font-semibold text-center px-4 py-2 rounded"
      >
        View your Order
      </Link>

      {/* Total */}
      <span className="text-sm font-semibold text-gray-800">
        £{totalAmount.toFixed(2)}
      </span>
    </div>
  );
}
