import { Check } from 'lucide-react'

export default function StepIndicator({
  steps,
  current,
}: {
  steps: string[]
  current: number
}) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isDone = index < current
        const isActive = index === current
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold ${
                  isDone
                    ? 'bg-ink text-paper'
                    : isActive
                      ? 'bg-yellow text-ink'
                      : 'bg-paper-dim text-ink-faint'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={`hidden text-[12.5px] sm:block ${
                  isActive ? 'font-semibold text-ink' : 'text-ink-soft'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`mx-2 h-px flex-1 ${isDone ? 'bg-ink' : 'bg-line-strong'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
