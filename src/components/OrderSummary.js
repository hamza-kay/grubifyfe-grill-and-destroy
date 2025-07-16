"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Minus, Plus } from "lucide-react";

export default function OrderSummary() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice("eposnow"));
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-500">Loading your order...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-200 pb-4 last:border-none"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="w-7 h-7 border border-red-600 text-red-600 bg-white hover:bg-red-50 rounded flex items-center justify-center transition-colors"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-sm w-6 text-center text-gray-900 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      className="w-7 h-7 border border-red-600 text-red-600 bg-white hover:bg-red-50 rounded flex items-center justify-center transition-colors"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-red-600 font-semibold text-sm">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          <hr className="my-4" />

          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">£{totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="font-medium">£1.00</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium italic text-gray-500">
              To be calculated
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>£{(totalPrice + 1).toFixed(2)}</span>
          </div>

          {/* Desktop button */}
          <Button
            size="lg"
            className="w-full bg-red-600 text-white hover:bg-red-700 hidden lg:block"
          >
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>

      {/* Sticky Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-md lg:hidden">
        <Button
          size="lg"
          className="w-full bg-red-600 text-white hover:bg-red-700"
        >
          Proceed to Payment
        </Button>
      </div>
    </>
  );
}
