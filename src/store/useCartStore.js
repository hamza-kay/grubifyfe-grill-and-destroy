import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existing = get().cartItems.find(
          (ci) =>
            ci.id === item.id &&
            JSON.stringify(ci.selectedModifiers || []) ===
              JSON.stringify(item.selectedModifiers || [])
        );

        if (existing) {
          set({
            cartItems: get().cartItems.map((ci) =>
              ci.id === item.id &&
              JSON.stringify(ci.selectedModifiers || []) ===
                JSON.stringify(item.selectedModifiers || [])
                ? { ...ci, quantity: ci.quantity + item.quantity }
                : ci
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, item],
          });
        }
      },
      removeFromCart: (itemId) => {
        set({
          cartItems: get().cartItems.filter((ci) => ci.id !== itemId),
        });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
      totalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: (pos) => {
        return get().cartItems.reduce((total, item) => {
          let price;

          if (pos === "eposnow") {
            price = item.price;
          } else if (pos === "other") {
            price = parseFloat(item.totalPrice || 0);
          } else {
            price = 0;
          }

          const modifiersPrice = (item.selectedModifiers || []).reduce(
            (sum, mod) => sum + (mod.modifierData?.priceMoney?.amount || 0),
            0
          );

          const addonsPrice = (item.selectedAddons || []).reduce(
            (sum, addon) => sum + (addon.price || 0),
            0
          );

          const sizePrice = item.selectedSize?.price || 0;
          const variationPrice = item.selectedVariation?.price || 0;

          const itemTotal =
            (price + modifiersPrice + addonsPrice + sizePrice + variationPrice) *
            item.quantity;

          return total + itemTotal;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
    }
  )
);
