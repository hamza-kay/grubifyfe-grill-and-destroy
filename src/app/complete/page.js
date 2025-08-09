"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

// Load Stripe once
const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = pk ? loadStripe(pk) : Promise.resolve(null);

export default function CompletePage() {
  const search = useSearchParams();
  const router = useRouter();

  const clientSecret = search.get("payment_intent_client_secret");
  const [status, setStatus] = useState("checking"); // 'checking' | 'success' | 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkIntent() {
      if (!clientSecret) {
        setStatus("error");
        setMessage("No payment was found.");
        return;
      }

      try {
        const stripe = await stripePromise;
        if (!stripe) {
          setStatus("error");
          setMessage("Stripe failed to load. Please try again.");
          return;
        }

        const res = await stripe.retrievePaymentIntent(clientSecret);
        const paymentIntent = res && res.paymentIntent;

        switch (paymentIntent?.status) {
          case "succeeded":
            setStatus("success");
            setMessage("");
            setTimeout(() => router.push("/"), 5000);
            break;
          case "processing":
          case "requires_action":
            setStatus("checking");
            setMessage("We’re still confirming your payment…");
            break;
          default:
            setStatus("error");
            setMessage("Payment not confirmed.");
        }
      } catch (e) {
        console.error(e);
        setStatus("error");
        setMessage("Something went wrong while checking your payment.");
      }
    }

    checkIntent();
  }, [clientSecret, router]);

  // Invalid entry — no secret present and we're in error state
  if (!clientSecret && status === "error") {
    return (
      <main className="flex items-center justify-center h-screen px-4 text-center">
        <div>
          <h1 className="text-lg font-semibold text-red-600">⚠️ Invalid Access</h1>
          <p className="text-gray-600 mt-2">{message || "No payment was found."}</p>
          <Button onClick={() => router.push("/")} variant="outline" className="mt-6">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  if (status === "checking") {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center gap-2">
        <div>⏳ Verifying…</div>
        {message && <p className="text-gray-500 text-sm">{message}</p>}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center gap-2">
        <div>❌ Payment not confirmed.</div>
        {message && <p className="text-gray-500 text-sm">{message}</p>}
        <Button onClick={() => router.push("/")} variant="outline" className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  // success
  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
      <h1 className="text-green-600 text-2xl font-bold mb-3">✅ Order Complete</h1>
      <p className="text-gray-700">We’ll start preparing it shortly.</p>
      <p className="text-gray-500 text-sm mt-4">Redirecting to home…</p>
      <Button onClick={() => router.push("/")} variant="outline" className="w-full mt-6">
        Back to Home
      </Button>
    </main>
  );
}
