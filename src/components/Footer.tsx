import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[280px] text-[14.5px] leading-relaxed text-ink-soft">
              Uma plataforma de ingressos simples, moderna e com taxas mais justas.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[13px] font-semibold text-ink">Produto</h4>
            <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
              <li><Link to="/eventos" className="hover:text-ink">Eventos</Link></li>
              <li><Link to="/experiencias" className="hover:text-ink">Experiências</Link></li>
              <li><Link to="/como-funciona" className="hover:text-ink">Como funciona</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] font-semibold text-ink">Organizadores</h4>
            <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
              <li><Link to="/para-organizadores" className="hover:text-ink">Para organizadores</Link></li>
              <li><Link to="/organizador" className="hover:text-ink">Painel</Link></li>
              <li><Link to="/organizador/criar-evento" className="hover:text-ink">Criar evento</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[13px] font-semibold text-ink">Converto</h4>
            <ul className="mt-4 space-y-3 text-[14px] text-ink-soft">
              <li><Link to="/entrar" className="hover:text-ink">Entrar</Link></li>
              <li><Link to="/criar-conta" className="hover:text-ink">Criar conta</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Converto</span>
          <a
            href="https://www.instagram.com/convertohub/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            Instagram @convertohub
          </a>
        </div>
      </div>
    </footer>
  )
}
