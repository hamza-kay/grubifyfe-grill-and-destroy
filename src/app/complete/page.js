"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientSecret = searchParams.get("payment_intent_client_secret");

  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!clientSecret || !window.Stripe) return;

      try {
        const stripe = window.Stripe(
          "pk_live_51Q5F2DF4Au5KQjEAXJgOs1NLzN2omZSqhongqqLhkwCVi6zqK6BIIbEDfSORGPiFBaKPGJTkIEqJtYTbAwqvGHc4007YlbdokV"
        );
        const result = await stripe.retrievePaymentIntent(clientSecret);
        const paymentIntent = result?.paymentIntent;

        if (paymentIntent?.status === "succeeded") {
          clearCart();
          setStatus("success");

          const timeout = setTimeout(() => router.push("/"), 5000);
          return () => clearTimeout(timeout);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Stripe error:", err);
        setStatus("error");
      }
    };

    fetchPaymentIntent();
  }, [clientSecret, clearCart, router]);

  if (status === "checking") {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-center text-gray-600 text-base">⏳ Verifying your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <p className="text-center text-red-600 text-base">
          ❌ Payment failed. Please try again.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
      <div className="w-full">
        <h1 className="text-green-600 text-2xl font-bold mb-3">
          ✅ Order Complete
        </h1>
        <p className="text-gray-700 text-base">
          Thank you for your order! We’ll start preparing it shortly.
        </p>
        <p className="text-gray-500 text-sm mt-4">
          You’ll be redirected to the homepage in a few seconds.
        </p>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="w-full mt-6"
        >
          Back to Home
        </Button>
      </div>
    </main>
  );
}
