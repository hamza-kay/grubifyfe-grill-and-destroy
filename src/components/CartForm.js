"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Store } from "lucide-react";
import clsx from "clsx";

export default function CartForm() {
  const [fulfillmentType, setFulfillmentType] = useState("DELIVERY");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </div>
        <Input placeholder="Email Address" />
        <Input placeholder="Phone Number" />

        <CardTitle className="mt-8">Delivery Details</CardTitle>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mt-2">
          <Button
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-red-600 transition-colors",
              fulfillmentType === "DELIVERY"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white text-red-600 hover:bg-red-50"
            )}
            onClick={() => setFulfillmentType("DELIVERY")}
          >
            <Bike className="w-4 h-4" />
            Delivery
          </Button>
          <Button
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-red-600 transition-colors",
              fulfillmentType === "PICKUP"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white text-red-600 hover:bg-red-50"
            )}
            onClick={() => setFulfillmentType("PICKUP")}
          >
            <Store className="w-4 h-4" />
            Pickup
          </Button>
        </div>

        {/* Estimated Times */}
        <div className="text-sm text-gray-700 flex items-center gap-2 mt-2">
          {fulfillmentType === "DELIVERY" ? (
            <>
              <Bike className="w-4 h-4 text-gray-500" />
              Estimated delivery: <span className="font-medium">30-40 min</span>
            </>
          ) : (
            <>
              <Store className="w-4 h-4 text-gray-500" />
              Estimated pickup: <span className="font-medium">15 min</span>
            </>
          )}
        </div>

        {/* Delivery Fields */}
        <div
          className={clsx(
            "grid grid-cols-1 gap-4 transition-all duration-300",
            fulfillmentType === "DELIVERY"
              ? "opacity-100 max-h-[1000px]"
              : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          <Input placeholder="Street Address" />
          <Input placeholder="Apartment or building name (optional)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Postcode" />
            <Input placeholder="City" />
          </div>
        </div>

        <Input placeholder="Additional notes (optional)" />
      </CardContent>
    </Card>
  );
}
