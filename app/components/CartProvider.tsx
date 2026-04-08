"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

// ---------------------------------------------------------------------------
// Module-level external store — keeps cart state outside React so that
// useSyncExternalStore can read it without useState or effects.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "nutri-cart";
let _items: CartItem[] = [];
const _listeners = new Set<() => void>();

function _notify() {
  _listeners.forEach((l) => l());
}

function _write(next: CartItem[]) {
  _items = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors etc.
  }
  _notify();
}

function _subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

function _getSnapshot() {
  return _items;
}

/** Stable empty array returned by every server/SSR render — must be a constant
 *  so React sees the same reference and does not loop. */
const _emptySnapshot: CartItem[] = [];
function _getServerSnapshot(): CartItem[] {
  return _emptySnapshot;
}

// ---------------------------------------------------------------------------

export function CartProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore: server renders [] (getServerSnapshot), client reads
  // the module-level store. On mount the useEffect below hydrates from
  // localStorage by writing to _items and notifying — no setState in effect.
  const items = useSyncExternalStore(
    _subscribe,
    _getSnapshot,
    _getServerSnapshot,
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) _write(JSON.parse(stored) as CartItem[]);
    } catch {
      // ignore malformed data
    }
  }, []);

  const addItem = useCallback((product: Product) => {
    const existing = _items.find((i) => i.product.id === product.id);
    if (existing) {
      _write(
        _items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      _write([..._items, { product, quantity: 1 }]);
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    _write(_items.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    _write(
      _items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => _write([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
