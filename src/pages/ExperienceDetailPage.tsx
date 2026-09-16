import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Check, MapPin, Waves } from 'lucide-react'
import { experiences, parkDates, parkTickets } from '../data/mock'
import { calculateFee, formatCurrency } from '../services/pricing'
import { useCart } from '../hooks/useCart'
import Button from '../components/Button'
import Badge from '../components/Badge'

const seasonLabel: Record<string, string> = {
  baixa: 'Baixa temporada',
  media: 'Média temporada',
  alta: 'Alta temporada',
}

const seasonDot: Record<string, string> = {
  baixa: 'bg-signal',
  media: 'bg-yellow-deep',
  alta: 'bg-[#c0392b]',
}

export default function ExperienceDetailPage() {
  const { slug } = useParams()
  const experience = experiences.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!experience) {
    return <Navigate to="/experiencias" replace />
  }

  return (
    <div>
      <div
        className="flex h-[320px] items-end"
        style={{
          background: `linear-gradient(160deg, ${experience.coverGradient[0]}, ${experience.coverGradient[1]})`,
        }}
      >
        <div className="mx-auto w-full max-w-[1240px] px-5 pb-10 lg:px-8">
          <Badge tone="yellow">Experiência</Badge>
          <h1 className="mt-4 font-display text-[36px] font-semibold text-paper sm:text-[44px]">
            {experience.title}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-[14.5px] text-paper/75">
            <MapPin className="h-4 w-4" /> {experience.city}
          </p>
        </div>
      </div>

      {experience.slug === 'aquaman' ? <AquamanFlow /> : <GenericExperience tagline={experience.tagline} />}
    </div>
  )
}

function GenericExperience({ tagline }: { tagline: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const price = 39.9

  function handleAdd() {
    addItem({
      kind: 'experiencia',
      refId: 'portal-imersivo',
      title: 'Portal Imersivo Nordeste',
      variant: 'Ingresso único',
      date: 'Válido por 30 dias',
      location: 'Fortaleza, CE',
      unitPrice: price,
      quantity: 1,
    })
    setAdded(true)
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <p className="max-w-[560px] text-[16px] leading-relaxed text-ink-soft">{tagline}. Escolha seu ingresso e viva essa experiência sem complicação, com taxa transparente, como em toda a Converto.</p>

        <div className="border border-line bg-paper p-6 ticket-notch-sm">
          <p className="text-[13px] text-ink-faint">Ingresso único</p>
          <p className="mt-1 font-display text-[24px] font-semibold text-ink">{formatCurrency(price)}</p>
          <Button fullWidth size="lg" className="mt-5" onClick={handleAdd}>
            Comprar ingresso
          </Button>
          {added && (
            <p className="mt-3 text-center text-[13px] font-medium text-signal">
              Adicionado. <Link to="/carrinho" className="underline">Ver carrinho</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function AquamanFlow() {
  const { addItem } = useCart()
  const [step, setStep] = useState<'data' | 'ingresso'>('data')
  const [selectedDate, setSelectedDate] = useState(parkDates[3].date)
  const [ticketId, setTicketId] = useState(parkTickets[0].id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const date = parkDates.find((item) => item.date === selectedDate) ?? parkDates[0]
  const ticket = parkTickets.find((item) => item.id === ticketId) ?? parkTickets[0]
  const subtotal = ticket.price * quantity
  const fee = calculateFee(quantity)
  const total = subtotal + fee

  const dateLabel = new Date(`${date.date}T00:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  function handleAdd() {
    addItem({
      kind: 'experiencia',
      refId: 'aquaman',
      title: 'Aquaman Parque Aquático',
      variant: ticket.name,
      date: dateLabel,
      location: 'Aquiraz, CE',
      unitPrice: ticket.price,
      quantity,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
      <div className="mb-10 flex items-center gap-3 text-[14px] text-ink-soft">
        <Waves className="h-4 w-4 text-yellow-deep" />
        Um dia inteiro de diversão, piscinas, atrações e experiências para toda a família.
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep('data')}
              className={`text-[15px] font-semibold ${step === 'data' ? 'text-ink' : 'text-ink-faint'}`}
            >
              1. Escolha a data
            </button>
            <div className="h-px flex-1 bg-line-strong" />
            <button
              onClick={() => setStep('ingresso')}
              className={`text-[15px] font-semibold ${step === 'ingresso' ? 'text-ink' : 'text-ink-faint'}`}
            >
              2. Escolha o ingresso
            </button>
          </div>

          {step === 'data' ? (
            <div className="mt-8">
              <h2 className="font-display text-[20px] font-semibold text-ink">Escolha o dia da sua visita</h2>
              <div className="mt-3 flex flex-wrap gap-4 text-[12.5px] text-ink-soft">
                {Object.entries(seasonLabel).map(([key, label]) => (
                  <span key={key} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${seasonDot[key]}`} /> {label}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {parkDates.map((slot) => (
                  <button
                    key={slot.date}
                    onClick={() => setSelectedDate(slot.date)}
                    className={`border p-4 text-left transition-colors ticket-notch-sm ${
                      selectedDate === slot.date
                        ? 'border-ink bg-paper-dim'
                        : 'border-line-strong hover:border-ink-soft'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                      <span className={`h-2 w-2 rounded-full ${seasonDot[slot.season]}`} />
                      {seasonLabel[slot.season]}
                    </span>
                    <p className="mt-2 font-display text-[20px] font-semibold text-ink">
                      {slot.day} <span className="text-[13px] font-medium text-ink-soft">{slot.month}</span>
                    </p>
                    <p className="mt-1 text-[13.5px] font-medium text-ink">{formatCurrency(slot.price)}</p>
                  </button>
                ))}
              </div>

              <Button className="mt-8" onClick={() => setStep('ingresso')}>
                Continuar
              </Button>
            </div>
          ) : (
            <div className="mt-8">
              <h2 className="font-display text-[20px] font-semibold text-ink">Escolha seu ingresso</h2>
              <p className="mt-1 text-[13.5px] text-ink-soft">Visita em {dateLabel}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {parkTickets.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTicketId(item.id)}
                    className={`flex flex-col gap-3 border p-5 text-left transition-colors ticket-notch-sm ${
                      ticketId === item.id ? 'border-ink bg-paper-dim' : 'border-line-strong hover:border-ink-soft'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-[16px] font-semibold text-ink">{item.name}</span>
                      {ticketId === item.id && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-paper">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    {item.tag && <Badge tone="yellow" className="w-fit">{item.tag}</Badge>}
                    <p className="text-[13.5px] text-ink-soft">{item.description}</p>
                    <p className="font-display text-[18px] font-semibold text-ink">{formatCurrency(item.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="border border-line bg-paper p-6 ticket-notch-sm">
            <h3 className="font-display text-[16px] font-semibold text-ink">Resumo</h3>
            <div className="mt-4 space-y-1 text-[14px]">
              <p className="text-ink">{ticket.name}</p>
              <p className="text-ink-soft">{dateLabel}</p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
              <span className="text-[14px] text-ink-soft">Quantidade</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong"
                >
                  −
                </button>
                <span className="w-4 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((value) => Math.min(6, value + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong"
                >
                  +
                </button>
              </div>
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

            <Button fullWidth size="lg" className="mt-6" onClick={handleAdd}>
              Comprar ingresso
            </Button>
            {added && (
              <p className="mt-3 text-center text-[13px] font-medium text-signal">
                Adicionado. <Link to="/carrinho" className="underline">Ver carrinho</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
