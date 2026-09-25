import type { Order } from '../types/order'
import { ORDER_STATUS_FLOW } from './OrderProgressStepper'

function ClockIcon({ className }: { className?: string }) {
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
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function PackageIcon({ className }: { className?: string }) {
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

interface TrackingUnavailablePlaceholderProps {
  order: Order
  onCheckAgain?: () => void
  onReportIssue?: () => void
}

/**
 * Friendly placeholder when the order exists but carrier tracking
 * has not been generated yet — never a blank screen.
 */
export function TrackingUnavailablePlaceholder({
  order,
  onCheckAgain,
  onReportIssue,
}: TrackingUnavailablePlaceholderProps) {
  if (!order.isTrackingUnavailable) return null

  return (
    <section
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
      role="status"
      aria-label="Tracking not available yet"
    >
      <div className="px-5 pt-6 pb-5 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100">
          <ClockIcon className="size-7" />
        </div>
        <h2 className="mt-4 text-base font-semibold tracking-tight text-slate-900">
          Tracking is on the way
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Your order is confirmed, but the carrier hasn&apos;t shared live
          tracking yet. This usually appears within a few hours after processing
          begins — hang tight, we&apos;ll update this page automatically.
        </p>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <PackageIcon className="size-4" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-medium text-slate-900">
              Order {order.orderId} is active
            </p>
            <p className="mt-0.5 text-sm text-slate-500">
              Current status: {order.status}. Product details and delivery
              estimate above are still accurate.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-5 py-4">
        <p className="mb-3 text-xs font-medium tracking-wide text-slate-500 uppercase">
          What to expect
        </p>
        <ol className="space-y-3" aria-hidden="true">
          {ORDER_STATUS_FLOW.map((step, index) => {
            const isFirst = index === 0
            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    isFirst
                      ? 'border-sky-300 bg-sky-50 text-sky-700'
                      : 'border-dashed border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-sm ${
                    isFirst ? 'font-medium text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step}
                  {isFirst ? ' · in progress' : ' · coming soon'}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      {(onCheckAgain || onReportIssue) && (
        <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-3.5">
          {onCheckAgain && (
            <button
              type="button"
              onClick={onCheckAgain}
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            >
              Check again
            </button>
          )}
          {onReportIssue && (
            <button
              type="button"
              onClick={onReportIssue}
              className="flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.99]"
            >
              Report a delivery issue
            </button>
          )}
        </div>
      )}
    </section>
  )
}
