export type EventFormat = 'presencial' | 'online'

export type Category =
  | 'Tecnologia'
  | 'Música'
  | 'Educação'
  | 'Gastronomia'
  | 'Esportes'
  | 'Entretenimento'
  | 'Experiências'

export interface TicketType {
  id: string
  name: string
  price: number
  description?: string
  available: number
}

export interface EventItem {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: Category
  format: EventFormat
  date: string
  time: string
  location: string
  city: string
  coverGradient: [string, string]
  organizer: string
  faq: { question: string; answer: string }[]
  tickets: TicketType[]
}

export type Season = 'baixa' | 'media' | 'alta'

export interface ParkDateSlot {
  date: string
  day: number
  month: string
  season: Season
  price: number
}

export interface ParkTicketType {
  id: string
  name: string
  description: string
  price: number
  tag?: string
}

export interface Experience {
  id: string
  slug: string
  title: string
  tagline: string
  city: string
  coverGradient: [string, string]
}

export interface CartItem {
  id: string
  kind: 'evento' | 'experiencia'
  refId: string
  title: string
  variant: string
  date: string
  location: string
  unitPrice: number
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  buyer: {
    name: string
    email: string
    document: string
    phone: string
  }
  paymentMethod: 'pix' | 'cartao'
  subtotal: number
  fee: number
  total: number
  createdAt: string
}
