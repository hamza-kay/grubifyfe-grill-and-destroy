"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  "pk_live_51Q5F2DF4Au5KQjEAXJgOs1NLzN2omZSqhongqqLhkwCVi6zqK6BIIbEDfSORGPiFBaKPGJTkIEqJtYTbAwqvGHc4007YlbdokV"
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (paymentIntent && paymentIntent.status === "succeeded") {
      router.push("/complete");
    } else {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Pay Now
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  if (!clientSecret) {
    return <p>No payment found.</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
