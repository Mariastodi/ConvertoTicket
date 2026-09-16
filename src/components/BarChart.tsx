export default function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((point) => point.value))

  return (
    <div className="flex h-48 items-end gap-3 sm:gap-5">
      {data.map((point) => (
        <div key={point.label} className="flex flex-1 flex-col items-center gap-2.5">
          <div className="flex h-36 w-full items-end">
            <div
              className="w-full rounded-t-[6px] bg-yellow transition-all"
              style={{ height: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className="text-[12px] text-ink-soft">{point.label}</span>
        </div>
      ))}
    </div>
  )
}
