import type { LucideIcon } from 'lucide-react'

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
}) {
  return (
    <div className="border border-line bg-paper p-5 ticket-notch-sm">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-dim text-ink-soft">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {trend && <span className="text-[12.5px] font-semibold text-signal">{trend}</span>}
      </div>
      <p className="mt-4 font-display text-[26px] font-semibold text-ink">{value}</p>
      <p className="mt-1 text-[13.5px] text-ink-soft">{label}</p>
    </div>
  )
}
