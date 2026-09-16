export default function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
        active
          ? 'border-ink bg-ink text-paper'
          : 'border-line-strong text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}
