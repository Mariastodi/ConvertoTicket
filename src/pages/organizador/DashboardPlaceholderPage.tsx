import type { LucideIcon } from 'lucide-react'
import { Construction } from 'lucide-react'

export default function DashboardPlaceholderPage({
  title,
  icon: Icon = Construction,
}: {
  title: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-5 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-dim text-ink-soft">
        <Icon className="h-6 w-6" />
      </span>
      <h1 className="mt-5 font-display text-[22px] font-semibold text-ink">{title}</h1>
      <p className="mt-2 max-w-[360px] text-[14px] text-ink-soft">
        Essa área chega na Converto 2.0. Nesta demonstração, o foco está no fluxo de
        criação de eventos e no acompanhamento de vendas.
      </p>
    </div>
  )
}
