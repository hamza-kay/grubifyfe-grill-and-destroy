"use client";

import { useCartStore } from "@/store/useCartStore";

export default function Header({ title }) {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <header className="bg-gray-100 py-4 mb-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        <span className="text-gray-600">
          Cart Items: {totalItems}
        </span>
      </div>
    </header>
  );
}
