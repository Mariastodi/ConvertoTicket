import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, Order } from '../types'
import { calculateFee } from '../services/pricing'
import { CartContext, type CartContextValue } from './CartContext'

const STORAGE_KEY = 'converto:cart'
const ORDER_KEY = 'converto:last-order'

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage(STORAGE_KEY, []))
  const [lastOrder, setLastOrderState] = useState<Order | null>(() =>
    readStorage(ORDER_KEY, null),
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (lastOrder) window.localStorage.setItem(ORDER_KEY, JSON.stringify(lastOrder))
  }, [lastOrder])

  function addItem(item: Omit<CartItem, 'id'>) {
    setItems((current) => {
      const existing = current.find(
        (entry) => entry.refId === item.refId && entry.variant === item.variant,
      )
      if (existing) {
        return current.map((entry) =>
          entry.id === existing.id
            ? { ...entry, quantity: entry.quantity + item.quantity }
            : entry,
        )
      }
      return [...current, { ...item, id: `${item.refId}-${item.variant}-${Date.now()}` }]
    })
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((entry) => entry.id !== id))
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry,
      ),
    )
  }

  function clear() {
    setItems([])
  }

  function setLastOrder(order: Order) {
    setLastOrderState(order)
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  )
  const quantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )
  const fee = useMemo(() => calculateFee(quantity), [quantity])
  const total = subtotal + fee

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    subtotal,
    fee,
    total,
    lastOrder,
    setLastOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}