import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarCheck, Menu, PlusCircle, Ticket, X } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../hooks/useCart'

const links = [
  { to: '/organizador/criar-evento', label: 'Criar evento', icon: PlusCircle },
  { to: '/organizador/meus-eventos', label: 'Meus eventos', icon: CalendarCheck },
  { to: '/carrinho', label: 'Meus ingressos', icon: Ticket },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-[92px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center gap-2 text-[15px] font-medium transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              <link.icon className="h-6 w-6 text-ink-faint transition-colors group-hover:text-yellow-deep" strokeWidth={1.8} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/entrar"
            className="flex h-12 items-center gap-2 rounded-full border border-line-strong px-2.5 pl-3 text-ink-soft transition-colors hover:border-ink hover:text-ink"
            aria-label="Abrir conta"
          >
            <Menu className="h-5 w-5" strokeWidth={1.8} />
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper-dim text-[13px] font-semibold text-ink">
              C
            </span>
            {itemCount > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-yellow px-1 text-[10px] font-bold text-ink">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] min-h-screen overflow-y-auto bg-[#fcfbf8] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <div className="mx-auto flex h-[92px] max-w-[1240px] items-center justify-between border-b border-line px-5">
            <Logo />
            <button
              className="flex h-10 w-10 items-center justify-center text-ink"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-5 pb-8 pt-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-line py-4 text-[17px] font-medium text-ink"
              >
                <link.icon className="h-5 w-5 text-yellow-deep" strokeWidth={1.8} />
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/entrar"
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[17px] font-medium text-ink"
            >
              Minha conta
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
