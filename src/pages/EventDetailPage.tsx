import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, Share2, User } from 'lucide-react'
import { events } from '../data/mock'
import { calculateFee, formatCurrency } from '../services/pricing'
import { useCart } from '../hooks/useCart'
import QuantityStepper from '../components/QuantityStepper'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function EventDetailPage() {
  const { slug } = useParams()
  const event = events.find((item) => item.slug === slug)
  const { addItem } = useCart()
  const [ticketId, setTicketId] = useState(event?.tickets[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!event) {
    return <Navigate to="/eventos" replace />
  }

  const currentEvent = event
  const ticket = currentEvent.tickets.find((item) => item.id === ticketId) ?? currentEvent.tickets[0]
  const subtotal = ticket.price * quantity
  const fee = calculateFee(quantity)
  const total = subtotal + fee

  function handleAddToCart() {
    addItem({
      kind: 'evento',
      refId: currentEvent.id,
      title: currentEvent.title,
      variant: ticket.name,
      date: currentEvent.date,
      location: currentEvent.location,
      unitPrice: ticket.price,
      quantity,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  return (
    <div>
      <div
        className="h-[280px]"
        style={{
          background: `linear-gradient(135deg, ${event.coverGradient[0]}, ${event.coverGradient[1]})`,
        }}
      />

      <div className="mx-auto max-w-[1240px] px-5 pb-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="-mt-14">
            <div className="border border-line bg-paper p-6 sm:p-8 ticket-notch">
              <Badge tone="yellow">{event.category}</Badge>
              <h1 className="mt-4 font-display text-[30px] font-semibold leading-tight text-ink sm:text-[36px]">
                {event.title}
              </h1>
              <p className="mt-1.5 text-[16px] text-ink-soft">{event.subtitle}</p>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-5 text-[14px] text-ink-soft">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {event.location}, {event.city}
                </span>
              </div>

              <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-ink-soft">
                {event.description}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-[20px] font-semibold text-ink">Sobre o organizador</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-dim text-ink-soft">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-ink">{event.organizer}</p>
                  <button className="flex items-center gap-1.5 text-[13px] text-ink-soft hover:text-ink">
                    <Share2 className="h-3.5 w-3.5" /> Compartilhar evento
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-[20px] font-semibold text-ink">Perguntas frequentes</h2>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {event.faq.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                      {item.question}
                      <span className="text-ink-faint transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-line bg-paper p-6 ticket-notch-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink">Escolha seu ingresso</h2>

              <div className="mt-4 space-y-2.5">
                {event.tickets.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTicketId(item.id)}
                    className={`flex w-full items-center justify-between border px-4 py-3.5 text-left transition-colors ${
                      ticketId === item.id ? 'border-ink bg-paper-dim' : 'border-line-strong hover:border-ink-soft'
                    }`}
                  >
                    <span>
                      <span className="block text-[14.5px] font-semibold text-ink">{item.name}</span>
                      <span className="text-[12.5px] text-ink-faint">{item.available} disponíveis</span>
                    </span>
                    <span className="font-display text-[15px] font-semibold text-ink">
                      {formatCurrency(item.price)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
                <span className="text-[14px] text-ink-soft">Quantidade</span>
                <QuantityStepper value={quantity} onChange={setQuantity} min={1} max={10} />
              </div>

              <div className="mt-5 space-y-2 border-t border-line pt-5 text-[14px]">
                <div className="flex justify-between text-ink-soft">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-soft">
                  <span>Taxa Converto</span>
                  <span>{formatCurrency(fee)}</span>
                </div>
                <div className="flex justify-between font-display text-[17px] font-semibold text-ink">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Button fullWidth size="lg" className="mt-6" onClick={handleAddToCart}>
                Comprar ingresso
              </Button>

              {added && (
                <p className="mt-3 text-center text-[13px] font-medium text-signal">
                  Ingresso adicionado ao carrinho.{' '}
                  <Link to="/carrinho" className="underline">
                    Ver carrinho
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
