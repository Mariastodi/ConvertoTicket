import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3,
  CalendarPlus,
  LayoutDashboard,
  Settings,
  Ticket,
  TrendingUp,
  Users,
} from 'lucide-react'
import Logo from '../components/Logo'
import ChatbotWidget from '../components/ChatbotWidget'

const items = [
  { to: '/organizador', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/organizador/meus-eventos', label: 'Meus eventos', icon: Ticket },
  { to: '/organizador/criar-evento', label: 'Criar evento', icon: CalendarPlus },
  { to: '/organizador/participantes', label: 'Participantes', icon: Users },
  { to: '/organizador/vendas', label: 'Vendas', icon: TrendingUp },
  { to: '/organizador/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/organizador/configuracoes', label: 'Configurações', icon: Settings },
]

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-[248px] flex-none flex-col border-r border-line bg-paper px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo />
        </div>
        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${
                  isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-paper-dim hover:text-ink'
                }`
              }
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="px-3 text-[13px] text-ink-faint hover:text-ink-soft">
          ← Voltar ao site
        </NavLink>
      </aside>

      <div className="flex-1">
        <div className="border-b border-line px-5 py-4 lg:hidden">
          <Logo />
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${
                    isActive ? 'border-ink bg-ink text-paper' : 'border-line-strong text-ink-soft'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
      <ChatbotWidget />
    </div>
  )
}
