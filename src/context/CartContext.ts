import { createContext } from 'react'
import type { CartItem, Order } from '../types'

export interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  subtotal: number
  fee: number
  total: number
  lastOrder: Order | null
  setLastOrder: (order: Order) => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)