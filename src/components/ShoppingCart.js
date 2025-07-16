"use client";

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice("eposnow"));
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      // Dummy payload example
      const updatedCart = {
        cartItems,
        fulfillments: [
          {
            uid: "some-uid",
            type: "PICKUP",
            state: "PROPOSED",
            pickupDetails: {
              displayName: "Test User",
              scheduleType: "ASAP",
              pickupAt: new Date().toISOString(),
              note: "Order from Next.js",
              address: "123 Test Street",
              email: "test@example.com",
              number: "0700000000",
              pos: "eposnow",
            },
          },
        ],
      };

      console.log("Sending updatedCart to backend:", updatedCart);

      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(
        `${baseUrl}/eposnow/create-payment-intent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCart),
        }
      );

      if (!response.ok) {
        console.error("Backend error:", response.status, response.statusText);
        return;
      }

      const data = await response.json();

      if (!data.clientSecret) {
        console.error("No clientSecret returned!");
        return;
      }

      router.push(`/checkout?clientSecret=${data.clientSecret}`);
    } catch (error) {
      console.error("Stripe error:", error);
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={item.image_url || "/images/placeholder.jpg"}
                alt={item.name}
                width={80}
                height={80}
                className="rounded object-cover w-20 h-20"
              />
              <div>
                <CardTitle className="text-base">{item.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-right font-semibold text-red-600">
              £{(item.price * item.quantity).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-between items-center border-t pt-6">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg font-bold text-red-600">
          £{totalPrice.toFixed(2)}
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleCheckout} size="lg">
          Go to Checkout
        </Button>
      </div>
    </div>
  );
}
