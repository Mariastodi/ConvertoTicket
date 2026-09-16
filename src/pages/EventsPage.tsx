import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import EventCard from '../components/EventCard'
import CategoryChip from '../components/CategoryChip'
import { categories, events } from '../data/mock'
import type { EventFormat } from '../types'

export default function EventsPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('busca') ?? '')
  const [category, setCategory] = useState<string | null>(searchParams.get('categoria'))
  const [format, setFormat] = useState<EventFormat | 'todos'>('todos')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = query
        ? event.title.toLowerCase().includes(query.toLowerCase()) ||
          event.subtitle.toLowerCase().includes(query.toLowerCase())
        : true
      const matchesCategory = category ? event.category === category : true
      const matchesFormat = format === 'todos' ? true : event.format === format
      return matchesQuery && matchesCategory && matchesFormat
    })
  }, [query, category, format])

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[32px] font-semibold text-ink sm:text-[38px]">Eventos</h1>
        <p className="text-[15px] text-ink-soft">
          Encontre eventos presenciais e online com taxas transparentes.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 border border-line bg-paper-dim p-5 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 border border-line-strong bg-paper px-4 py-3">
          <Search className="h-4 w-4 text-ink-faint" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque por eventos, shows, experiências..."
            className="w-full bg-transparent text-[14.5px] outline-none placeholder:text-ink-faint"
          />
        </div>

        <div className="flex items-center gap-2 text-[13.5px] text-ink-soft">
          <SlidersHorizontal className="h-4 w-4" />
          Formato
        </div>
        <div className="flex gap-2">
          {(['todos', 'presencial', 'online'] as const).map((option) => (
            <CategoryChip
              key={option}
              label={option === 'todos' ? 'Todos' : option === 'presencial' ? 'Presencial' : 'Online'}
              active={format === option}
              onClick={() => setFormat(option)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <CategoryChip label="Todas as categorias" active={category === null} onClick={() => setCategory(null)} />
        {categories.map((item) => (
          <CategoryChip key={item} label={item} active={category === item} onClick={() => setCategory(item)} />
        ))}
      </div>

      <p className="mt-8 text-[13.5px] text-ink-soft">
        {filtered.length} {filtered.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-dashed border-line-strong py-16 text-center">
          <p className="font-display text-[18px] font-semibold text-ink">Nenhum evento por aqui ainda</p>
          <p className="mt-2 text-[14px] text-ink-soft">Tente ajustar sua busca ou remover alguns filtros.</p>
        </div>
      )}
    </div>
  )
}
