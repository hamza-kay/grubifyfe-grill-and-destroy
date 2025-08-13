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



      


removeDealFromCart: (dealGroupId) => {
  set({
    cartItems: get().cartItems.filter(
      (item) => item.parentDealId !== dealGroupId && item.id !== dealGroupId
    ),
  });
},






      increaseQuantity: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      decreaseQuantity: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      totalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },

      groupedCartCount: () => {
  const items = get().cartItems;

  // group by parentDealId if it exists, else by id
  const uniqueGroups = new Set(
    items.map(item => item.parentDealId || item.id)
  );

  return uniqueGroups.size;
},

      totalPrice: () => {
        return get().cartItems.reduce((total, item) => {
          const basePrice = item.price || 0;

          const modifiersPrice = (item.selectedModifiers || []).reduce(
            (sum, mod) => sum + (mod.price || 0),
            0
          );

          const addonsPrice = (item.selectedAddons || []).reduce(
            (sum, addon) => sum + (addon.price || 0),
            0
          );

          const sizePrice = item.selectedSize?.price || 0;
          const variationPrice = item.selectedVariation?.price || 0;

          const itemTotal =
            (basePrice +
              modifiersPrice +
              addonsPrice +
              sizePrice +
              variationPrice) * item.quantity;

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
