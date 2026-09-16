import type { ReactNode } from 'react'

type Tone = 'ink' | 'yellow' | 'outline' | 'signal'

const toneClasses: Record<Tone, string> = {
  ink: 'bg-ink text-paper',
  yellow: 'bg-yellow text-ink',
  outline: 'border border-line-strong text-ink-soft',
  signal: 'bg-signal-soft text-signal',
}

export default function Badge({
  children,
  tone = 'outline',
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
