import { Check, X } from 'lucide-react'
import { formatCurrency } from '../services/pricing'

export default function FeeComparison() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="border border-line-strong bg-paper-dim p-6 ticket-notch-sm">
        <div className="flex items-center gap-2 text-ink-faint">
          <X className="h-4 w-4" />
          <span className="text-[13px] font-medium">Plataformas tradicionais</span>
        </div>
        <dl className="mt-5 space-y-3 text-[14.5px]">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Ingresso</dt>
            <dd className="text-ink">{formatCurrency(10)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Taxas adicionais</dt>
            <dd className="text-ink">até {formatCurrency(2.5)}</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-line-strong pt-4">
          <span className="font-display font-semibold text-ink">Total</span>
          <span className="font-display font-semibold text-ink">até {formatCurrency(12.5)}</span>
        </div>
      </div>

      <div className="border-2 border-ink bg-ink p-6 ticket-notch-sm">
        <div className="flex items-center gap-2 text-yellow">
          <Check className="h-4 w-4" />
          <span className="text-[13px] font-medium">Converto</span>
        </div>
        <dl className="mt-5 space-y-3 text-[14.5px]">
          <div className="flex justify-between">
            <dt className="text-paper/70">Ingresso</dt>
            <dd className="text-paper">{formatCurrency(10)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-paper/70">Taxa Converto</dt>
            <dd className="text-paper">{formatCurrency(0.5)}</dd>
          </div>
        </dl>
        <div className="mt-4 flex justify-between border-t border-paper/15 pt-4">
          <span className="font-display font-semibold text-yellow">Total</span>
          <span className="font-display font-semibold text-yellow">{formatCurrency(10.5)}</span>
        </div>
      </div>
    </div>
  )
}
