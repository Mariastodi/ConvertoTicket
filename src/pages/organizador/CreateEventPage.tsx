import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../../components/Button'
import { categories } from '../../data/mock'
import type { EventFormat } from '../../types'

interface DraftTicket {
  id: number
  name: string
  price: string
  quantity: string
}

export default function CreateEventPage() {
  const [format, setFormat] = useState<EventFormat>('presencial')
  const [published, setPublished] = useState(false)
  const [tickets, setTickets] = useState<DraftTicket[]>([
    { id: 1, name: 'Ingresso Padrão', price: '', quantity: '' },
  ])

  function addTicket() {
    setTickets((current) => [...current, { id: Date.now(), name: '', price: '', quantity: '' }])
  }

  function removeTicket(id: number) {
    setTickets((current) => current.filter((ticket) => ticket.id !== id))
  }

  function updateTicket(id: number, key: keyof DraftTicket, value: string) {
    setTickets((current) =>
      current.map((ticket) => (ticket.id === id ? { ...ticket, [key]: value } : ticket)),
    )
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setPublished(true)
    window.setTimeout(() => setPublished(false), 3200)
  }

  return (
    <div className="px-5 py-8 lg:px-10 lg:py-10">
      <h1 className="font-display text-[26px] font-semibold text-ink">Criar evento</h1>
      <p className="mt-1 text-[14px] text-ink-soft">Preencha as informações principais do seu evento.</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-[720px] space-y-10">
        <section>
          <h2 className="font-display text-[16px] font-semibold text-ink">Informações gerais</h2>
          <div className="mt-4 space-y-4">
            <TextField label="Nome do evento" placeholder="Ex.: Festival Converto" required />
            <TextArea label="Descrição" placeholder="Conte para o público o que torna esse evento especial." />
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Categoria" options={categories} />
              <TextField label="Imagem de capa (URL)" placeholder="https://" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Data" type="date" />
              <TextField label="Horário" type="time" />
            </div>
            <div>
              <span className="text-[13px] font-medium text-ink-soft">Formato</span>
              <div className="mt-2 flex gap-2">
                {(['presencial', 'online'] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setFormat(option)}
                    className={`rounded-full border px-4 py-2 text-[13.5px] font-medium ${
                      format === option ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink-soft'
                    }`}
                  >
                    {option === 'presencial' ? 'Presencial' : 'Online'}
                  </button>
                ))}
              </div>
            </div>
            <TextField label="Local" placeholder={format === 'online' ? 'Link da transmissão' : 'Endereço do evento'} />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[16px] font-semibold text-ink">Ingressos</h2>
            <button
              type="button"
              onClick={addTicket}
              className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-soft hover:text-ink"
            >
              <Plus className="h-4 w-4" /> Adicionar ingresso
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border border-line-strong p-4 ticket-notch-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-ink-faint">Tipo de ingresso</span>
                  {tickets.length > 1 && (
                    <button type="button" onClick={() => removeTicket(ticket.id)} className="text-ink-faint hover:text-[#c0392b]">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <TextField
                    label="Nome"
                    value={ticket.name}
                    onChange={(value) => updateTicket(ticket.id, 'name', value)}
                    compact
                  />
                  <TextField
                    label="Preço (R$)"
                    type="number"
                    value={ticket.price}
                    onChange={(value) => updateTicket(ticket.id, 'price', value)}
                    compact
                  />
                  <TextField
                    label="Quantidade"
                    type="number"
                    value={ticket.quantity}
                    onChange={(value) => updateTicket(ticket.id, 'quantity', value)}
                    compact
                  />
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <TextField label="Início das vendas" type="date" compact />
                  <TextField label="Encerramento das vendas" type="date" compact />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[12.5px] text-ink-faint">
            A taxa Converto é calculada automaticamente e exibida ao comprador no checkout.
          </p>
        </section>

        <div className="flex items-center gap-4">
          <Button type="submit" size="lg">Publicar evento</Button>
          {published && (
            <span className="text-[13.5px] font-medium text-signal">
              Evento publicado (demonstração).
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

function TextField({
  label,
  compact,
  value,
  onChange,
  ...rest
}: {
  label: string
  compact?: boolean
  value?: string
  onChange?: (value: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <input
        {...rest}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={`mt-1.5 w-full border border-line-strong bg-paper px-3.5 text-[14px] outline-none focus-visible:border-ink ${
          compact ? 'h-10' : 'h-11'
        }`}
      />
    </label>
  )
}

function TextArea({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <textarea
        placeholder={placeholder}
        rows={4}
        className="mt-1.5 w-full resize-none border border-line-strong bg-paper px-3.5 py-3 text-[14px] outline-none focus-visible:border-ink"
      />
    </label>
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      <select className="mt-1.5 h-11 w-full border border-line-strong bg-paper px-3.5 text-[14px] outline-none focus-visible:border-ink">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}
