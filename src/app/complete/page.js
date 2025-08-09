"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const clientSecret = searchParams.get("payment_intent_client_secret");
  const [status, setStatus] = useState("checking"); // "checking" | "success" | "error"

  useEffect(() => {
    let timeoutId = null;

    async function fetchPaymentIntent() {
      // no secret in the URL → invalid access
      if (!clientSecret) {
        setStatus("error");
        return;
      }

      try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) throw new Error("Stripe failed to load");

        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        const s = paymentIntent && paymentIntent.status;
        if (s === "succeeded") {
          clearCart();
          setStatus("success");
          timeoutId = setTimeout(() => router.push("/"), 5000);
        } else if (s === "processing" || s === "requires_action") {
          setStatus("checking");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Stripe error:", err);
        setStatus("error");
      }
    }

    fetchPaymentIntent();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [clientSecret, clearCart, router]);

  // invalid access / missing secret
  if (!clientSecret && status === "error") {
    return (
      <main className="flex items-center justify-center h-screen px-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-red-600">⚠️ Invalid Access</h1>
          <p className="text-gray-600 mt-2">
            No payment was found. If you believe this is a mistake, please return to the homepage.
          </p>
          <Button onClick={() => router.push("/")} variant="outline" className="mt-6">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

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
        <p className="text-center text-red-600 text-base">❌ Payment not confirmed. Please try again.</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
      <div className="w-full">
        <h1 className="text-green-600 text-2xl font-bold mb-3">✅ Order Complete</h1>
        <p className="text-gray-700 text-base">Thank you for your order! We’ll start preparing it shortly.</p>
        <p className="text-gray-500 text-sm mt-4">You’ll be redirected to the homepage in a few seconds.</p>
        <Button onClick={() => router.push("/")} variant="outline" className="w-full mt-6">
          Back to Home
        </Button>
      </div>
    </main>
  );
}
