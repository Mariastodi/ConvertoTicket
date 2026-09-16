import { Link } from 'react-router-dom'
import logoAsset from '../assets/logo.svg'

type LogoProps = {
  variant?: 'dark' | 'light'
  withWordmark?: boolean
  to?: string
}

export default function Logo({ variant = 'dark', withWordmark = true, to = '/' }: LogoProps) {
  const ink = variant === 'dark' ? 'text-ink' : 'text-paper'

  return (
    <Link to={to} className="group flex items-center gap-3.5">
      <span className="flex h-16 w-16 items-center justify-center rounded-[16px] bg-yellow transition-transform duration-150 group-hover:scale-105">
        <img src={logoAsset} alt="" className="h-10 w-10" />
      </span>
      {withWordmark && (
        <span className={`font-display text-[27px] font-semibold tracking-[-0.02em] ${ink}`}>
          Converto
        </span>
      )}
    </Link>
  )
}
