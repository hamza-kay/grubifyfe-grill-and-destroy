"use client";

import Image from "next/image";
import { useState } from "react";

export default function MenuItem({ item, onClick }) {
  const fallbackUrl = "https://cdn.grubify.co.uk/popularpizza/utensil.webp";
  const [imgError, setImgError] = useState(false);
  const showFallback = !item.image_url || imgError;

  return (
    <div
      onClick={onClick}
      

      className="flex p-0 flex-col h-[350px] w-full bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full h-56">
        {showFallback ? (
          <Image
            src={fallbackUrl}
            alt="Fallback"
            fill
            className="object-contain p-6 grayscale opacity-50 bg-gray-100"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {item.description || "Delicious meal prepared with the finest ingredients."}
        </p>
        {item.kcal && (
          <p className="text-xs text-gray-500 mt-1">{item.kcal} kcal</p>
        )}

        <p className="text-red-600 font-bold text-lg mt-4">
          £{(item.price || Object.values(item.sizes || {})[0] || 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
