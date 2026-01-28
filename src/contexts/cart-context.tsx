"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/product";

const STORAGE_KEY = "ayurvedic-pharmacy-cart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity" | "addedAt"> }
  | { type: "REMOVE_ITEM"; payload: { id: string; variant: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; variant: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity" | "addedAt">) => void;
  removeItem: (id: string, variant: string) => void;
  updateQuantity: (id: string, variant: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedVariant.variant === action.payload.selectedVariant.variant
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: 1, addedAt: Date.now() },
        ],
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.selectedVariant.variant === action.payload.variant
            )
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity < 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.selectedVariant.variant === action.payload.variant
              )
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id &&
          item.selectedVariant.variant === action.payload.variant
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "HYDRATE":
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", payload: parsedItems });
      }
    } catch (error) {
      console.error("Failed to hydrate cart from localStorage:", error);
    }
  }, []);

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [state.items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity" | "addedAt">) => {
      dispatch({ type: "ADD_ITEM", payload: item });
    },
    []
  );

  const removeItem = useCallback((id: string, variant: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, variant } });
  }, []);

  const updateQuantity = useCallback(
    (id: string, variant: string, quantity: number) => {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, variant, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
