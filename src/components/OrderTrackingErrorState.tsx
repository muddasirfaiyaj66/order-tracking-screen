import { TrackingScreenFrame } from './TrackingScreenFrame'

interface OrderTrackingErrorStateProps {
  /** `error` = failed request; `empty` = no tracking data found. */
  variant?: 'error' | 'empty'
  title?: string
  message?: string
  orderId?: string
  onRetry?: () => void
}

const COPY = {
  error: {
    title: 'Couldn’t load tracking',
    message:
      'Something went wrong while fetching this order. Check your connection and try again.',
  },
  empty: {
    title: 'No tracking data',
    message:
      'We couldn’t find tracking details for this order. It may still be processing or the link is invalid.',
  },
} as const

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

function EmptyBoxIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  )
}

/** Empty / error view when tracking data is missing or fails to load. */
export function OrderTrackingErrorState({
  variant = 'error',
  title,
  message,
  orderId,
  onRetry,
}: OrderTrackingErrorStateProps) {
  const copy = COPY[variant]
  const resolvedTitle = title ?? copy.title
  const resolvedMessage = message ?? copy.message
  const Icon = variant === 'empty' ? EmptyBoxIcon : AlertIcon

  const supportSubject = encodeURIComponent(
    orderId
      ? `Support request for order ${orderId}`
      : 'Support request — tracking unavailable',
  )
  const supportBody = encodeURIComponent(
    orderId
      ? `Hi Support,\n\nI need help with order ${orderId}. Tracking failed to load.\n\nThanks,`
      : `Hi Support,\n\nI need help — tracking details failed to load.\n\nThanks,`,
  )

  return (
    <TrackingScreenFrame>
      <header className="tracking-screen-gutter border-b border-slate-200 bg-white pt-4 pb-4">
        <p className="eyebrow">Order tracking</p>
        {orderId ? (
          <p className="mt-2 text-[13px] text-slate-500">
            Order <span className="font-medium text-slate-700">{orderId}</span>
          </p>
        ) : (
          <p className="mt-2 text-[13px] text-slate-500">Unable to load order</p>
        )}
      </header>

      <main className="tracking-screen-gutter flex flex-1 flex-col items-center justify-center py-8">
        <div
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center shadow-[0_1px_2px_rgb(15_23_42/0.04)] min-[390px]:px-5"
          role="alert"
        >
          <div
            className={`mx-auto flex size-12 items-center justify-center rounded-2xl min-[390px]:size-14 ${
              variant === 'empty'
                ? 'bg-slate-100 text-slate-500'
                : 'bg-rose-50 text-rose-600'
            }`}
          >
            <Icon className="size-6 min-[390px]:size-7" />
          </div>

          <h1 className="mt-3.5 text-[15px] font-semibold tracking-tight text-slate-900 min-[390px]:text-base">
            {resolvedTitle}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
            {resolvedMessage}
          </p>

          <div className="mt-5 flex flex-col gap-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="touch-target flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-[13px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
              >
                Try again
              </button>
            )}
            <a
              href={`mailto:support@example.com?subject=${supportSubject}&body=${supportBody}`}
              className="touch-target flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </TrackingScreenFrame>
  )
}
