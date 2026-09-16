import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import Button from '../components/Button'
import EventCard from '../components/EventCard'
import ExperienceCard from '../components/ExperienceCard'
import CategoryChip from '../components/CategoryChip'
import FeeComparison from '../components/FeeComparison'
import { categories, events, experiences } from '../data/mock'
import { formatCurrency } from '../services/pricing'
import LogoMark from '../components/LogoMark'

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query) params.set('busca', query)
    if (activeCategory) params.set('categoria', activeCategory)
    navigate(`/eventos?${params.toString()}`)
  }

  return (
    <div>
      <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 border border-line-strong px-3 py-1.5 text-[13px] font-medium text-ink-soft">
              Taxas mais justas para eventos e experiências
            </p>
            <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[58px]">
              Seu evento. Seu ingresso.
              <br />
              Do seu jeito.
            </h1>
            <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-ink-soft">
              Venda ingressos para eventos, experiências e atrações com uma plataforma
              simples, moderna e taxas mais justas.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/eventos">
                <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Encontrar eventos
                </Button>
              </Link>
              <Link to="/para-organizadores">
                <Button size="lg" variant="outline">
                  Quero vender ingressos
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative h-[360px] sm:h-[420px]">
            <div className="absolute right-0 top-0 w-[min(280px,80vw)] rotate-3 border border-line bg-paper p-5 shadow-[0_20px_50px_rgba(21,19,15,0.14)] ticket-notch-sm lg:right-6 lg:top-4 lg:w-[280px]">
              <p className="text-[12px] font-medium text-yellow-deep">25 de outubro · Fortaleza</p>
              <p className="mt-1 font-display text-[17px] font-semibold text-ink">Festival Converto</p>
              <div className="perforation my-3 h-3" />
              <p className="text-[13px] text-ink-soft">A partir de {formatCurrency(25)}</p>
            </div>

            <div className="absolute left-0 top-32 w-[min(260px,76vw)] -rotate-2 border border-line bg-ink p-5 text-paper shadow-[0_20px_50px_rgba(21,19,15,0.22)] ticket-notch-sm lg:left-2 lg:top-40 lg:w-[260px]">
              <p className="text-[12px] font-medium text-paper/60">16 de outubro · Online</p>
              <p className="mt-1 font-display text-[17px] font-semibold">IA na Prática</p>
              <div className="my-3 h-px bg-paper/15" />
              <p className="text-[13px] text-paper/70">{formatCurrency(10)}</p>
            </div>

            <div className="absolute bottom-0 right-0 flex w-[min(250px,78vw)] items-center gap-3 border border-ink bg-yellow p-4 shadow-[0_18px_40px_rgba(169,120,10,0.35)] ticket-notch-sm lg:bottom-2 lg:right-10 lg:w-[250px]">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink">
                <LogoMark className="h-5 w-5 text-yellow" />
              </span>
              <div>
                <p className="text-[12px] font-medium text-ink/70">Taxa Converto</p>
                <p className="font-display text-[15px] font-semibold text-ink">{formatCurrency(0.5)} por ingresso</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
          <h2 className="font-display text-[28px] font-semibold text-ink sm:text-[32px]">
            O que você quer viver hoje?
          </h2>

          <form onSubmit={handleSearch} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 border border-line-strong bg-paper px-4 py-3.5">
              <Search className="h-[18px] w-[18px] text-ink-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque por eventos, shows, experiências..."
                className="w-full bg-transparent text-[15px] outline-none placeholder:text-ink-faint"
              />
            </div>
            <Button type="submit" size="lg">
              Buscar
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() =>
                  setActiveCategory((current) => (current === category ? null : category))
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[28px] font-semibold text-ink sm:text-[32px]">
            Eventos em destaque
          </h2>
          <Link to="/eventos" className="hidden text-[14.5px] font-semibold text-ink-soft hover:text-ink sm:block">
            Ver todos
          </Link>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-display text-[32px] font-semibold leading-tight sm:text-[38px]">
                Menos taxa.
                <br />
                Mais experiência.
              </h2>
              <p className="mt-5 max-w-[420px] text-[15.5px] leading-relaxed text-paper/70">
                A Converto nasceu para tornar a venda de ingressos mais simples para quem
                organiza e mais justa para quem compra.
              </p>

              <div className="mt-9 space-y-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'Taxas transparentes',
                    text: 'Você sabe exatamente o que está pagando.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Experiência simples',
                    text: 'Do evento à compra, sem complicação.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Mais valor para o organizador',
                    text: 'Uma plataforma pensada para ajudar eventos e experiências a crescerem.',
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-paper/10">
                      <benefit.icon className="h-[18px] w-[18px] text-yellow" />
                    </span>
                    <div>
                      <p className="font-display text-[16px] font-semibold">{benefit.title}</p>
                      <p className="mt-1 text-[14.5px] text-paper/65">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-[13px] font-medium uppercase tracking-wide text-paper/50">
                Você sabe exatamente quanto está pagando
              </p>
              <FeeComparison />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-[28px] font-semibold text-ink sm:text-[32px]">Experiências</h2>
          <Link to="/experiencias" className="hidden text-[14.5px] font-semibold text-ink-soft hover:text-ink sm:block">
            Ver todas
          </Link>
        </div>
        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8">
        <div className="flex flex-col items-start gap-6 border border-line bg-paper-dim p-10 ticket-notch sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-[24px] font-semibold text-ink">
              Pronto para vender com a Converto?
            </h3>
            <p className="mt-2 max-w-[420px] text-[14.5px] text-ink-soft">
              Crie seu primeiro evento em minutos e acompanhe tudo em um painel simples.
            </p>
          </div>
          <Link to="/organizador/criar-evento">
            <Button size="lg">Criar evento</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
