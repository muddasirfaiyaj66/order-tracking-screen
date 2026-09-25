import type { TrackingStep } from '../types/order'

interface StatusTrackerProps {
  steps: TrackingStep[]
}

function formatStepTime(timestamp: string | null) {
  if (!timestamp) return 'Pending'
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export function StatusTracker({ steps }: StatusTrackerProps) {
  return (
    <section className="px-4 py-2" aria-label="Delivery progress">
      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1
          const markerClass = step.current
            ? 'border-emerald-500 bg-emerald-500'
            : step.completed
              ? 'border-emerald-500 bg-emerald-500'
              : 'border-slate-300 bg-white'

          return (
            <li key={step.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={`absolute top-3 left-[11px] h-[calc(100%-0.75rem)] w-0.5 ${
                    step.completed ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${markerClass}`}
                aria-hidden="true"
              >
                {(step.completed || step.current) && (
                  <span className="size-2 rounded-full bg-white" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p
                    className={`text-sm font-semibold ${
                      step.current || step.completed
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <time className="shrink-0 text-xs text-slate-500">
                    {formatStepTime(step.timestamp)}
                  </time>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
