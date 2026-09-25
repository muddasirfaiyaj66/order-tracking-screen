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

export function TrackingUnavailablePlaceholder({
  order,
  onCheckAgain,
  onReportIssue,
}: TrackingUnavailablePlaceholderProps) {
  if (!order.isTrackingUnavailable) return null

  return (
    <section
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
      role="status"
      aria-label="Tracking not available yet"
    >
      <div className="px-4 pt-5 pb-4 text-center min-[390px]:px-5 min-[390px]:pt-6">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 min-[390px]:size-14">
          <ClockIcon className="size-6 min-[390px]:size-7" />
        </div>
        <h2 className="mt-3.5 text-[15px] font-semibold tracking-tight text-slate-900 min-[390px]:mt-4 min-[390px]:text-base">
          Tracking is on the way
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
          Your order is confirmed, but the carrier hasn&apos;t shared live
          tracking yet. This usually appears within a few hours after processing
          begins.
        </p>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3.5 min-[390px]:px-5">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <PackageIcon className="size-4" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[13px] font-medium text-slate-900">
              Order {order.orderId} is active
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-slate-500">
              Status: {order.status}. Product details and ETA above are still
              accurate.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-3.5 min-[390px]:px-5">
        <p className="eyebrow mb-3">What to expect</p>
        <ol className="space-y-2.5" aria-hidden="true">
          {ORDER_STATUS_FLOW.map((step, index) => {
            const isFirst = index === 0
            return (
              <li key={step} className="flex items-center gap-2.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                    isFirst
                      ? 'border-sky-300 bg-sky-50 text-sky-700'
                      : 'border-dashed border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`min-w-0 text-[13px] ${
                    isFirst ? 'font-medium text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {step}
                  <span className="text-slate-400">
                    {isFirst ? ' · in progress' : ' · coming soon'}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      {(onCheckAgain || onReportIssue) && (
        <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-3.5 min-[390px]:px-5">
          {onCheckAgain && (
            <button
              type="button"
              onClick={onCheckAgain}
              className="touch-target flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]"
            >
              Check again
            </button>
          )}
          {onReportIssue && (
            <button
              type="button"
              onClick={onReportIssue}
              className="flex w-full items-center justify-center rounded-xl px-4 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.99]"
            >
              Report a delivery issue
            </button>
          )}
        </div>
      )}
    </section>
  )
}
