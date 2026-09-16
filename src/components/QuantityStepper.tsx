import { Minus, Plus } from 'lucide-react'

export default function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 20,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-ink disabled:opacity-30"
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center font-display text-[15px] font-semibold text-ink">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-ink disabled:opacity-30"
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
