"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import AlertsHeader from "@/components/AlertsHeader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export default function Header({ sections, restaurant }) {
  const totalItems = useCartStore((state) => state.totalItems());
  const [isHeroHidden, setIsHeroHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroHidden(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* TOP NAV — STICKY */}
<header className="bg-[#333333] text-gray-800 sticky top-0 z-50">
  <div className="w-full border-b border-gray-200">
   <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-between justify-center px-4 py-4 sm:py-3 md:py-2">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="https://api.ramtd.net/images/sites/90/logo.png"
          alt={restaurant?.title || "Popular Pizza"}
          width={160}
          height={50}
          className="h-[50px] w-auto object-contain"
        />
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <Button
          variant="default"
          size="sm"
    className="hidden md:inline-flex bg-[#E50914] hover:bg-[#B00020] text-white"
>
          Order Now
        </Button>
     <User className="w-5 h-5 text-white" />
        <Link href="/cart" className="relative">
         <ShoppingCart className="w-5 h-5 text-white" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  </div>
</header>


      {/* ALERTS HEADER — NON-STICKY */}
      <AlertsHeader restaurant={restaurant} isHeroHidden={isHeroHidden} />

      {/* TABS — STICKY BELOW HERO */}
      {sections?.length > 0 && (
<div className="tabs-sticky w-full bg-white border-b border-gray-200 sticky top-[75px]  md:top-[60px] lg:top-[65px] z-40">





          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2  overflow-x-auto text-[var(--color-accent)]">
            {sections.map((section) => (
              <a
                key={section.id}
 onClick={() => {
  const el = document.getElementById(`section-${section.id}`);
  if (el) {
    // ensure hero is hidden first
    if (window.scrollY <= 50) {
      window.scrollTo({
        top: 51,
        behavior: "instant",
      });
    }

    requestAnimationFrame(() => {
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight || 0;

      const tabs = document.querySelector(".tabs-sticky");
      const tabsHeight = tabs?.offsetHeight || 0;

      const totalOffset = headerHeight + tabsHeight + 20;

      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        totalOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    });
  }
}}

                className="text-sm font-medium px-3 py-2 text-red-600 rounded hover:bg-gray-100 transition cursor-pointer whitespace-nowrap"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
