import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import Logo from '../components/Logo'

export default function AuthPage() {
  const location = useLocation()
  const [mode, setMode] = useState<'entrar' | 'criar-conta'>(
    location.pathname.includes('criar-conta') ? 'criar-conta' : 'entrar',
  )

  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px-260px)] max-w-[420px] flex-col justify-center px-5 py-16">
      <div className="mb-8">
        <Logo />
      </div>

      <div className="flex border-b border-line">
        <button
          onClick={() => setMode('entrar')}
          className={`flex-1 border-b-2 pb-3 text-[14.5px] font-semibold ${
            mode === 'entrar' ? 'border-ink text-ink' : 'border-transparent text-ink-faint'
          }`}
        >
          Entrar
        </button>
        <button
          onClick={() => setMode('criar-conta')}
          className={`flex-1 border-b-2 pb-3 text-[14.5px] font-semibold ${
            mode === 'criar-conta' ? 'border-ink text-ink' : 'border-transparent text-ink-faint'
          }`}
        >
          Criar conta
        </button>
      </div>

      <form className="mt-7 space-y-4" onSubmit={(event) => event.preventDefault()}>
        {mode === 'criar-conta' && (
          <label className="block">
            <span className="text-[13px] font-medium text-ink-soft">Nome completo</span>
            <input className="mt-1.5 h-11 w-full border border-line-strong bg-paper px-4 text-[14.5px] outline-none focus-visible:border-ink" />
          </label>
        )}
        <label className="block">
          <span className="text-[13px] font-medium text-ink-soft">E-mail</span>
          <input type="email" className="mt-1.5 h-11 w-full border border-line-strong bg-paper px-4 text-[14.5px] outline-none focus-visible:border-ink" />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-ink-soft">Senha</span>
          <input type="password" className="mt-1.5 h-11 w-full border border-line-strong bg-paper px-4 text-[14.5px] outline-none focus-visible:border-ink" />
        </label>

        <Button type="submit" fullWidth size="lg" className="mt-2">
          {mode === 'entrar' ? 'Entrar' : 'Criar conta'}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-faint">
        Autenticação real chega na Converto 2.0. Esta tela é apenas ilustrativa.
      </p>

      <Link to="/" className="mt-8 text-center text-[13.5px] font-medium text-ink-soft hover:text-ink">
        ← Voltar para a home
      </Link>
    </div>
  )
}
