import { formatCurrency } from '../services/pricing'

export default function PriceBreakdown({
  subtotal,
  fee,
  total,
  compact = false,
}: {
  subtotal: number
  fee: number
  total: number
  compact?: boolean
}) {
  return (
    <div className={compact ? 'space-y-2' : 'space-y-3'}>
      <div className="flex items-center justify-between text-[14px] text-ink-soft">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex items-center justify-between text-[14px] text-ink-soft">
        <span>Taxa Converto</span>
        <span>{formatCurrency(fee)}</span>
      </div>
      <div className="flex items-center justify-between border-t border-line pt-3 font-display text-[17px] font-semibold text-ink">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
