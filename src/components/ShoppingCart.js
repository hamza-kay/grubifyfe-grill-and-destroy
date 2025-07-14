"use client";

import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useAppId } from "@/components/AppIdProvider";

export default function ShoppingCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice("eposnow"));
  const router = useRouter();
  const { appId, loading } = useAppId();

  if (loading) {
    return <p>Loading cart...</p>;
  }

const handleCheckout = async () => {
  try {
    const fulfillments = [
      {
        uid: "59083446-6deb-409f-b6f6-3f504114462b",
        type: "PICKUP", // or DELIVERY
        state: "PROPOSED",
        location: "YOUR_LOCATION_ID",
        pickupDetails: {
          appId: appId,
          recipient: {
            displayName: "Test User",
          },
          scheduleType: "ASAP",
          pickupAt: new Date().toISOString(),
          note: "Order from Next.js",
          address: "123 Test Street",
          email: "test@example.com",
          number: "0700000000",
          pos: "eposnow",
        }
      }
    ];

    const updatedCart = {
      cartItems: cartItems,
      fulfillments
    };

    console.log("✅ Sending updatedCart to backend:", updatedCart);

    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(
      `${baseUrl}/eposnow/create-payment-intent`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-App-Id": appId,
        },
        body: JSON.stringify(updatedCart),
      }
    );

    if (!response.ok) {
      console.error("❌ Backend error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log("✅ Stripe response JSON:", data);

    if (!data.clientSecret) {
      console.error("❌ No clientSecret returned!");
      return;
    }

    router.push(`/checkout?clientSecret=${data.clientSecret}`);
  } catch (error) {
    console.error("Stripe error:", error);
  }
};


  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 && <p>Cart is empty.</p>}
      {cartItems.map((item) => (
        <div key={item.id}>
          <strong>{item.name}</strong> x {item.quantity}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: £{totalPrice.toFixed(2)}</h3>
      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "dodgerblue",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Checkout
        </button>
      )}
    </div>
  );
}
