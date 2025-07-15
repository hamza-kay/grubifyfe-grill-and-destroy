"use client";

import { FaInstagram, FaTiktok, FaPhone } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function AlertsHeader({ restaurant }) {
  if (!restaurant) return null;

  return (
    <div className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-4">
        <div className="flex-shrink-0 w-full md:w-64 h-40 relative rounded overflow-hidden">
          <Image
            src={restaurant.image || "/images/placeholder.jpg"}
            alt={restaurant.title}
            fill
            className="object-cover scale-[1.35]"
          />
        </div>
<div className="flex flex-col justify-center flex-1 space-y-2">
  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
    {restaurant.title}
  </h1>

  <p className="text-xs uppercase tracking-wide text-green-600 font-semibold">
    {restaurant.accepting_orders
      ? "Open"
      : "Closed, pre-order for later"}
  </p>

  {restaurant.description && (
    <p className="text-sm text-gray-700 font-medium">
      {restaurant.description}
    </p>
  )}

  {restaurant.address && (
    <p className="text-sm text-gray-700 font-medium">
      {restaurant.address}
    </p>
  )}

  <div className="flex flex-col gap-2 mt-2">
    {restaurant.phone && (
      <a
        href={`tel:${restaurant.phone.replace(/\s+/g, "")}`}
        className="flex items-center gap-2 text-gray-700 hover:text-[#E50914] text-sm font-medium"
      >
        <FaPhone className="w-4 h-4" />
        {restaurant.phone}
      </a>
    )}

    {restaurant.socials?.instagram && (
      <Link
        href={`https://instagram.com/${restaurant.socials.instagram}`}
        target="_blank"
        className="flex items-center gap-2 text-gray-700 hover:text-[#E50914] text-sm font-medium"
      >
        <FaInstagram className="w-4 h-4" />
        {restaurant.socials.instagram}
      </Link>
    )}
    {restaurant.socials?.tiktok && (
      <Link
        href={`https://www.tiktok.com/@${restaurant.socials.tiktok}`}
        target="_blank"
        className="flex items-center gap-2 text-gray-700 hover:text-[#E50914] text-sm font-medium"
      >
        <FaTiktok className="w-4 h-4" />
        {restaurant.socials.tiktok}
      </Link>
    )}
  </div>
</div>

      </div>
    </div>
  );
}
