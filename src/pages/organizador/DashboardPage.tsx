import { Link } from 'react-router-dom'
import { CalendarPlus, DollarSign, Ticket, Users } from 'lucide-react'
import StatCard from '../../components/StatCard'
import BarChart from '../../components/BarChart'
import Button from '../../components/Button'
import { events, organizerOverview, weeklySales } from '../../data/mock'
import { formatCurrency } from '../../services/pricing'

export default function DashboardPage() {
  return (
    <div className="px-5 py-8 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">Visão geral</h1>
          <p className="mt-1 text-[14px] text-ink-soft">Converto para Organizadores</p>
        </div>
        <Link to="/organizador/criar-evento">
          <Button icon={<CalendarPlus className="h-4 w-4" />}>Criar evento</Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Ingressos vendidos" value={organizerOverview.ticketsSold.toLocaleString('pt-BR')} icon={Ticket} trend="+12,4%" />
        <StatCard label="Receita" value={formatCurrency(organizerOverview.revenue)} icon={DollarSign} trend="+8,1%" />
        <StatCard label="Eventos ativos" value={String(organizerOverview.activeEvents)} icon={CalendarPlus} />
        <StatCard label="Participantes" value={organizerOverview.participants.toLocaleString('pt-BR')} icon={Users} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="border border-line bg-paper p-6 ticket-notch-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[16px] font-semibold text-ink">Vendas na semana</h2>
            <span className="text-[12.5px] text-ink-faint">Ingressos por dia</span>
          </div>
          <div className="mt-6">
            <BarChart data={weeklySales} />
          </div>
        </div>

        <div className="border border-line bg-paper p-6 ticket-notch-sm">
          <h2 className="font-display text-[16px] font-semibold text-ink">Meus eventos</h2>
          <div className="mt-4 space-y-3">
            {events.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center justify-between border-b border-line pb-3 last:border-0">
                <div>
                  <p className="text-[13.5px] font-medium text-ink">{event.title}</p>
                  <p className="text-[12px] text-ink-faint">{event.date}</p>
                </div>
                <span className="rounded-full bg-signal-soft px-2.5 py-1 text-[11px] font-semibold text-signal">
                  Ativo
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
