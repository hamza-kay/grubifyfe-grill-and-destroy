"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

export default function CompletePage() {
  const search = useSearchParams();
  const router = useRouter();
  const clientSecret = search.get("payment_intent_client_secret");
  const [status, setStatus] = useState("checking"); // checking | success | error

  useEffect(() => {
    let t = null;

    async function run() {
      if (!clientSecret) { setStatus("error"); return; }

      try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        if (!stripe) throw new Error("Stripe failed to load");
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        if (paymentIntent?.status === "succeeded") {
          setStatus("success");
          t = setTimeout(() => router.push("/"), 5000);
        } else if (paymentIntent?.status === "processing" || paymentIntent?.status === "requires_action") {
          setStatus("checking");
        } else {
          setStatus("error");
        }
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    }

    run();
    return () => { if (t) clearTimeout(t); };
  }, [clientSecret, router]);

  if (!clientSecret && status === "error") {
    return (
      <main className="flex items-center justify-center h-screen px-4 text-center">
        <div>
          <h1 className="text-lg font-semibold text-red-600">⚠️ Invalid Access</h1>
          <p className="text-gray-600 mt-2">No payment was found.</p>
          <Button onClick={() => router.push("/")} variant="outline" className="mt-6">Back to Home</Button>
        </div>
      </main>
    );
  }

  if (status === "checking") return <div className="flex items-center justify-center h-screen">⏳ Verifying…</div>;
  if (status === "error") return <div className="flex items-center justify-center h-screen">❌ Payment not confirmed.</div>;

  return (
    <main className="flex flex-col items-center justify-center px-4 py-10 max-w-md mx-auto text-center">
      <h1 className="text-green-600 text-2xl font-bold mb-3">✅ Order Complete</h1>
      <p className="text-gray-700">We’ll start preparing it shortly.</p>
      <p className="text-gray-500 text-sm mt-4">Redirecting to home…</p>
      <Button onClick={() => router.push("/")} variant="outline" className="w-full mt-6">Back to Home</Button>
    </main>
  );
}
