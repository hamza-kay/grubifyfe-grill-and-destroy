"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bike, Store } from "lucide-react";
import clsx from "clsx";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export default function CartForm() {
  const customer = useCheckoutStore((state) => state.customer);
  const setCustomer = useCheckoutStore((state) => state.setCustomer);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={customer.firstName}
            onChange={(e) =>
              setCustomer({ firstName: e.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            value={customer.lastName}
            onChange={(e) =>
              setCustomer({ lastName: e.target.value })
            }
          />
        </div>
        <Input
          placeholder="Email Address"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ email: e.target.value })
          }
        />
        <Input
          placeholder="Phone Number"
          value={customer.phoneNumber}
          onChange={(e) =>
            setCustomer({ phoneNumber: e.target.value })
          }
        />

        <CardTitle className="mt-8">Delivery Details</CardTitle>

        <div className="flex gap-2 mt-2">
          <Button
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-red-600 transition-colors",
              customer.fulfillmentType === "DELIVERY"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white text-red-600 hover:bg-red-50"
            )}
            onClick={() => setCustomer({ fulfillmentType: "DELIVERY" })}
          >
            <Bike className="w-4 h-4" />
            Delivery
          </Button>
          <Button
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-red-600 transition-colors",
              customer.fulfillmentType === "PICKUP"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-white text-red-600 hover:bg-red-50"
            )}
            onClick={() => setCustomer({ fulfillmentType: "PICKUP" })}
          >
            <Store className="w-4 h-4" />
            Pickup
          </Button>
        </div>

        <div className="text-sm text-gray-700 flex items-center gap-2 mt-2">
          {customer.fulfillmentType === "DELIVERY" ? (
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

        <div
          className={clsx(
            "grid grid-cols-1 gap-4 transition-all duration-300",
            customer.fulfillmentType === "DELIVERY"
              ? "opacity-100 max-h-[1000px]"
              : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          <Input
            placeholder="Street Address"
            value={customer.deliveryAddress}
            onChange={(e) =>
              setCustomer({ deliveryAddress: e.target.value })
            }
          />
          <Input
            placeholder="Apartment or building name (optional)"
            value={customer.apartment}
            onChange={(e) =>
              setCustomer({ apartment: e.target.value })
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Postcode"
              value={customer.postcode}
              onChange={(e) =>
                setCustomer({ postcode: e.target.value })
              }
            />
            <Input
              placeholder="City"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ city: e.target.value })
              }
            />
          </div>
        </div>

        <Input
          placeholder="Additional notes (optional)"
          value={customer.notes}
          onChange={(e) =>
            setCustomer({ notes: e.target.value })
          }
        />
      </CardContent>
    </Card>
  );
}
