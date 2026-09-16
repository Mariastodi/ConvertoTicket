import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Circle } from 'lucide-react'
import Button from '../components/Button'
import FeeComparison from '../components/FeeComparison'

const roadmap = [
  {
    version: 'Converto 1.0',
    status: 'available' as const,
    items: [
      'Venda de ingressos',
      'Eventos',
      'Experiências',
      'Checkout',
      'Taxas transparentes',
      'Dashboard básico',
    ],
  },
  {
    version: 'Converto 2.0',
    status: 'planned' as const,
    items: [
      'Login e autenticação',
      'Pagamento real',
      'QR Code validável',
      'Check-in de participantes',
      'Relatórios avançados',
      'Integração com WhatsApp',
      'Notificações',
      'Programa de fidelidade',
    ],
  },
  {
    version: 'Converto 3.0',
    status: 'planned' as const,
    items: [
      'Marketplace de experiências',
      'Integrações externas',
      'API pública',
      'Inteligência artificial',
      'Personalização para grandes clientes',
    ],
  },
]

export default function OrganizerLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-medium text-yellow-deep">Converto para Organizadores</p>
          <h1 className="mt-3 font-display text-[38px] font-semibold leading-tight text-ink sm:text-[46px]">
            Uma plataforma pensada para ajudar seu evento a crescer.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
            Crie eventos, defina ingressos e acompanhe vendas em tempo real, com a
            menor taxa de serviço do mercado e total transparência para o seu público.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/organizador/criar-evento">
              <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>Criar meu primeiro evento</Button>
            </Link>
            <Link to="/organizador">
              <Button size="lg" variant="outline">Ver painel de exemplo</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
          <h2 className="font-display text-[26px] font-semibold text-ink">Quanto você economiza com a Converto</h2>
          <p className="mt-2 max-w-[540px] text-[14.5px] text-ink-soft">
            Valores ilustrativos para demonstração. A taxa real é sempre mostrada antes da publicação do evento.
          </p>
          <div className="mt-8 max-w-[640px]">
            <FeeComparison />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8">
        <h2 className="font-display text-[26px] font-semibold text-ink">O que vem por aí?</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {roadmap.map((phase) => (
            <div key={phase.version} className="border border-line bg-paper p-6 ticket-notch-sm">
              <h3 className="font-display text-[17px] font-semibold text-ink">{phase.version}</h3>
              <ul className="mt-4 space-y-2.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-ink-soft">
                    {phase.status === 'available' ? (
                      <Check className="h-3.5 w-3.5 flex-none text-signal" />
                    ) : (
                      <Circle className="h-3 w-3 flex-none text-ink-faint" />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
