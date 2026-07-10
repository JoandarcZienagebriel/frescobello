import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SITE_CONFIG } from '../constants/site';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1, selectedShape = null) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.productId === product.id && item.selectedShape === selectedShape
          );
          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
                packSize: product.packSize,
                unit: product.unit,
                selectedShape,
                quantity,
              },
            ],
          };
        }),

      removeItem: (productId, selectedShape) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.productId === productId && item.selectedShape === selectedShape)
          ),
        })),

      updateQuantity: (productId, selectedShape, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.selectedShape === selectedShape
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      incrementQuantity: (productId, selectedShape) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.selectedShape === selectedShape
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrementQuantity: (productId, selectedShape) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.selectedShape === selectedShape
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTax: () => {
        return Math.round(get().getSubtotal() * SITE_CONFIG.taxRate);
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= SITE_CONFIG.freeShippingThreshold) return 0;
        return SITE_CONFIG.shippingRate;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'frescobello-cart',
    }
  )
);