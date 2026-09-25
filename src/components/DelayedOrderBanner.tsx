import type { DelayedNextStep, Order } from '../types/order'
import { ContactSupportButton } from './ContactSupportButton'

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`))
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function resolveNextStep(order: Order): DelayedNextStep {
  if (order.suggestedNextStep) return order.suggestedNextStep
  if (order.status === 'Shipped' || order.status === 'Out for Delivery') {
    return 'track_live_location'
  }
  return 'contact_support'
}

interface DelayedOrderBannerProps {
  order: Order
  onTrackLiveLocation?: () => void
}

export function DelayedOrderBanner({
  order,
  onTrackLiveLocation,
}: DelayedOrderBannerProps) {
  if (!order.isDelayed) return null

  const originalDate =
    order.originalEstimatedDeliveryDate ?? order.estimatedDeliveryDate
  const updatedDate = order.estimatedDeliveryDate
  const nextStep = resolveNextStep(order)
  const reason =
    order.delayReason ??
    'Your package is running behind the original delivery window.'

  return (
    <section
      className="overflow-hidden rounded-2xl border border-amber-300 bg-amber-50 shadow-sm"
      role="status"
      aria-label="Order delayed"
    >
      <div className="flex gap-3 px-4 py-3.5">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 ring-1 ring-amber-200">
          <WarningIcon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-950">
            Delivery delayed
          </p>
          <p className="mt-1 text-sm leading-snug text-amber-900/90">{reason}</p>
        </div>
      </div>

      <div className="border-t border-amber-200/80 bg-amber-100/50 px-4 py-3">
        <p className="text-[11px] font-medium tracking-wide text-amber-800/80 uppercase">
          Updated estimated delivery
        </p>
        <p className="mt-1 text-base font-semibold tracking-tight text-amber-950">
          {formatDate(updatedDate)}
        </p>
        <p className="mt-0.5 text-xs text-amber-800/80">
          Originally {formatDate(originalDate)}
        </p>
      </div>

      <div className="border-t border-amber-200/80 px-4 py-3">
        <p className="mb-2 text-xs font-medium text-amber-900/80">
          Suggested next step
        </p>
        {nextStep === 'track_live_location' ? (
          <button
            type="button"
            onClick={onTrackLiveLocation}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-900 px-4 py-3 text-sm font-semibold text-amber-50 transition hover:bg-amber-950 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
          >
            <MapPinIcon className="size-4" />
            Track live location
          </button>
        ) : (
          <ContactSupportButton orderId={order.orderId} />
        )}
      </div>
    </section>
  )
}
