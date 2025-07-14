"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function MenuItem({ item, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow transition p-0 overflow-hidden flex flex-col h-[320px] w-full"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[160px] flex-shrink-0">
        <Image
          src={item.image_url || "/images/placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          {/* TITLE */}
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
            {item.name}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description || "Delicious meal prepared with the finest ingredients."}
          </p>

          {/* KCAL */}
          {item.kcal && (
            <p className="text-xs text-gray-500 mt-1">
              {item.kcal} kcal
            </p>
          )}
        </div>

        {/* PRICES */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-red-600 font-bold text-base">
            £{(item.price || Object.values(item.sizes || {})[0] || 0).toFixed(2)}
          </span>

          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-gray-500 text-sm line-through">
              £{item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
