import { useState } from 'react'
import type { DeliveryIssueType, Order } from '../types/order'
import { ContactSupportButton } from './ContactSupportButton'
import { ContactSupportSheet } from './ContactSupportSheet'
import { DelayedOrderBanner } from './DelayedOrderBanner'
import { DeliveredNotReceivedAlert } from './DeliveredNotReceivedAlert'
import { ExpandableOrderDetails } from './ExpandableOrderDetails'
import { OrderProgressStepper } from './OrderProgressStepper'
import { ReportDeliveryIssueSheet } from './ReportDeliveryIssueSheet'
import { TrackingScreenFrame } from './TrackingScreenFrame'
import { TrackingUnavailablePlaceholder } from './TrackingUnavailablePlaceholder'

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`))
}

interface OrderTrackingScreenProps {
  order: Order
  onRefreshTracking?: () => void
}

export function OrderTrackingScreen({
  order,
  onRefreshTracking,
}: OrderTrackingScreenProps) {
  const [supportOpen, setSupportOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportDefaultType, setReportDefaultType] = useState<
    DeliveryIssueType | undefined
  >(undefined)

  const showUpdatedEta =
    order.isDelayed && Boolean(order.originalEstimatedDeliveryDate)
  const isDelivered = order.status === 'Delivered'

  const openReportIssue = (defaultType?: DeliveryIssueType) => {
    setReportDefaultType(defaultType)
    setSupportOpen(false)
    setReportOpen(true)
  }

  return (
    <TrackingScreenFrame>
      <header className="bg-white">
        <div className="px-5 pt-5">
          <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Order tracking
          </p>
        </div>
        <ExpandableOrderDetails order={order} />
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 py-5">
        <section
          className={`rounded-2xl border px-4 py-4 shadow-sm ${
            order.isDelayed
              ? 'border-amber-200 bg-amber-50/40'
              : order.isDeliveredButNotReceived
                ? 'border-rose-200 bg-rose-50/30'
                : order.isTrackingUnavailable
                  ? 'border-sky-200 bg-sky-50/40'
                  : 'border-slate-200/80 bg-white'
          }`}
        >
          <p
            className={`text-xs font-medium tracking-wide uppercase ${
              order.isDelayed
                ? 'text-amber-800'
                : order.isDeliveredButNotReceived
                  ? 'text-rose-800'
                  : order.isTrackingUnavailable
                    ? 'text-sky-800'
                    : 'text-slate-500'
            }`}
          >
            {order.isDelayed
              ? 'Updated estimated delivery'
              : isDelivered
                ? 'Delivered on'
                : 'Estimated delivery'}
          </p>
          <p
            className={`mt-1.5 text-xl font-semibold tracking-tight ${
              order.isDelayed
                ? 'text-amber-950'
                : order.isDeliveredButNotReceived
                  ? 'text-rose-950'
                  : order.isTrackingUnavailable
                    ? 'text-sky-950'
                    : 'text-slate-900'
            }`}
          >
            {formatDate(order.estimatedDeliveryDate)}
          </p>
          {showUpdatedEta ? (
            <p className="mt-1 text-sm text-amber-900/70">
              Originally{' '}
              <span className="line-through">
                {formatDate(order.originalEstimatedDeliveryDate!)}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-slate-500">
              Ordered on {formatDate(order.orderDate)}
            </p>
          )}
          {order.isDelayed && (
            <p className="mt-2 text-sm text-slate-500">
              Ordered on {formatDate(order.orderDate)}
            </p>
          )}
        </section>

        {order.isDelayed && (
          <DelayedOrderBanner
            order={order}
            onContactSupport={() => setSupportOpen(true)}
            onReportIssue={() => openReportIssue('delayed')}
            onTrackLiveLocation={() => {
              window.alert(
                `Live location for ${order.orderId} would open here.`,
              )
            }}
          />
        )}

        {order.isDeliveredButNotReceived && (
          <DeliveredNotReceivedAlert
            order={order}
            onReportIssue={() => openReportIssue('not_received')}
          />
        )}

        {order.isTrackingUnavailable ? (
          <TrackingUnavailablePlaceholder
            order={order}
            onCheckAgain={onRefreshTracking}
            onReportIssue={() => openReportIssue()}
          />
        ) : (
          <OrderProgressStepper currentStatus={order.status} />
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200/80 bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <ContactSupportButton onClick={() => setSupportOpen(true)} />
      </footer>

      <ContactSupportSheet
        open={supportOpen}
        order={order}
        onClose={() => setSupportOpen(false)}
        onReportIssue={() => openReportIssue()}
      />

      <ReportDeliveryIssueSheet
        key={`${reportOpen}-${reportDefaultType ?? 'none'}`}
        open={reportOpen}
        order={order}
        defaultIssueType={reportDefaultType}
        onClose={() => setReportOpen(false)}
      />
    </TrackingScreenFrame>
  )
}
