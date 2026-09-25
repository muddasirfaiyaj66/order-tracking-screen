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

  const etaTone = order.isDelayed
    ? 'amber'
    : order.isDeliveredButNotReceived
      ? 'rose'
      : order.isTrackingUnavailable
        ? 'sky'
        : 'neutral'

  const etaCardClass = {
    amber: 'border-amber-200/90 bg-amber-50/50',
    rose: 'border-rose-200/90 bg-rose-50/40',
    sky: 'border-sky-200/90 bg-sky-50/50',
    neutral: 'border-slate-200 bg-white',
  }[etaTone]

  const etaLabelClass = {
    amber: 'text-amber-800',
    rose: 'text-rose-800',
    sky: 'text-sky-800',
    neutral: 'text-slate-500',
  }[etaTone]

  return (
    <TrackingScreenFrame>
      <header className="bg-white">
        <div className="tracking-screen-gutter pt-4">
          <p className="eyebrow">Order tracking</p>
        </div>
        <ExpandableOrderDetails order={order} />
      </header>

      <main className="tracking-screen-gutter flex flex-1 flex-col gap-3.5 py-4 min-[390px]:gap-4 min-[390px]:py-5">
        <section className={`rounded-2xl border px-4 py-3.5 shadow-[0_1px_2px_rgb(15_23_42/0.04)] ${etaCardClass}`}>
          <p className={`eyebrow ${etaLabelClass}`}>
            {order.isDelayed
              ? 'Updated estimated delivery'
              : isDelivered
                ? 'Delivered on'
                : 'Estimated delivery'}
          </p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900 min-[390px]:text-xl">
            {formatDate(order.estimatedDeliveryDate)}
          </p>
          {showUpdatedEta ? (
            <p className="mt-1 text-[13px] text-amber-900/75">
              Originally{' '}
              <span className="line-through">
                {formatDate(order.originalEstimatedDeliveryDate!)}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-[13px] text-slate-500">
              Ordered on {formatDate(order.orderDate)}
            </p>
          )}
          {order.isDelayed && (
            <p className="mt-1.5 text-[13px] text-slate-500">
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

      <footer className="tracking-screen-gutter mt-auto border-t border-slate-200 bg-white pt-3.5 pb-[max(1rem,env(safe-area-inset-bottom))]">
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
