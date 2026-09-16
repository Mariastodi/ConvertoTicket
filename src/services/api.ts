import { events, experiences, parkDates, parkTickets } from '../data/mock'
import type { EventItem, Experience, Order, ParkDateSlot, ParkTicketType } from '../types'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Falha na requisição: ${path}`)
  }

  return response.json() as Promise<T>
}

function delay<T>(value: T, ms = 220): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const eventsApi = {
  list(): Promise<EventItem[]> {
    return USE_MOCK ? delay(events) : request<EventItem[]>('/events')
  },
  getBySlug(slug: string): Promise<EventItem | undefined> {
    return USE_MOCK
      ? delay(events.find((event) => event.slug === slug))
      : request<EventItem>(`/events/${slug}`)
  },
}

export const experiencesApi = {
  list(): Promise<Experience[]> {
    return USE_MOCK ? delay(experiences) : request<Experience[]>('/experiences')
  },
  getBySlug(slug: string): Promise<Experience | undefined> {
    return USE_MOCK
      ? delay(experiences.find((experience) => experience.slug === slug))
      : request<Experience>(`/experiences/${slug}`)
  },
}

export const parkApi = {
  listDates(): Promise<ParkDateSlot[]> {
    return USE_MOCK ? delay(parkDates) : request<ParkDateSlot[]>('/experiences/aquaman/dates')
  },
  listTickets(): Promise<ParkTicketType[]> {
    return USE_MOCK ? delay(parkTickets) : request<ParkTicketType[]>('/experiences/aquaman/tickets')
  },
}

export const ordersApi = {
  create(order: Order): Promise<Order> {
    return USE_MOCK
      ? delay(order, 600)
      : request<Order>('/orders', { method: 'POST', body: JSON.stringify(order) })
  },
}
