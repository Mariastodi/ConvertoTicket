import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin } from 'lucide-react'
import type { EventItem } from '../types'
import { formatCurrency } from '../services/pricing'
import Badge from './Badge'

export default function EventCard({ event }: { event: EventItem }) {
  const startingPrice = Math.min(...event.tickets.map((ticket) => ticket.price))
  const priceLabel =
    event.tickets.length > 1 ? `A partir de ${formatCurrency(startingPrice)}` : formatCurrency(startingPrice)

  return (
    <Link
      to={`/eventos/${event.slug}`}
      className="group flex flex-col overflow-hidden border border-line bg-paper ticket-notch transition-shadow hover:shadow-[0_12px_32px_rgba(21,19,15,0.10)]"
    >
      <div
        className="relative flex h-40 items-end p-4"
        style={{
          background: `linear-gradient(135deg, ${event.coverGradient[0]}, ${event.coverGradient[1]})`,
        }}
      >
        <Badge tone="yellow">{event.category}</Badge>
        <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-paper/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[13px] font-medium text-yellow-deep">{event.date} · {event.time}</p>
          <h3 className="mt-1 font-display text-[18px] font-semibold leading-snug text-ink">
            {event.title}
          </h3>
        </div>

        <p className="flex items-center gap-1.5 text-[13.5px] text-ink-soft">
          <MapPin className="h-3.5 w-3.5" />
          {event.location === event.city ? event.city : `${event.location}, ${event.city}`}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <span className="font-display text-[15px] font-semibold text-ink">{priceLabel}</span>
          <span className="text-[13px] font-semibold text-ink-soft group-hover:text-ink">Ver evento</span>
        </div>
      </div>
    </Link>
  )
}
