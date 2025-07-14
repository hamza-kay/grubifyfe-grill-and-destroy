"use client";

import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";


export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Popular Pizza Limited
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm">
            Order Now
          </Button>
          <User className="w-5 h-5 text-gray-600" />
<Link href="/cart" className="relative">
  <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-gray-900 transition" />
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {totalItems}
    </span>
  )}
</Link>

        </div>
      </div>
    </header>
  );
}
