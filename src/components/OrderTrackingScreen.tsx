import type { Order } from '../types/order'
import { ContactSupportButton } from './ContactSupportButton'
import { DelayedOrderBanner } from './DelayedOrderBanner'
import { DeliveredNotReceivedAlert } from './DeliveredNotReceivedAlert'
import { OrderProgressStepper } from './OrderProgressStepper'
import { StatusBadge } from './StatusBadge'
import { TrackingScreenFrame } from './TrackingScreenFrame'

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
}

export function OrderTrackingScreen({ order }: OrderTrackingScreenProps) {
  const showUpdatedEta =
    order.isDelayed && Boolean(order.originalEstimatedDeliveryDate)
  const isDelivered = order.status === 'Delivered'

  return (
    <TrackingScreenFrame>
      <header className="border-b border-slate-200/80 bg-white px-5 pt-5 pb-4">
        <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">
          Order tracking
        </p>
        <div className="mt-3 flex items-start gap-3.5">
          <img
            src={order.productImage}
            alt=""
            className="size-[72px] shrink-0 rounded-2xl bg-slate-100 object-cover ring-1 ring-slate-200/80"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                status={order.status}
                isDelayed={order.isDelayed && !order.isDeliveredButNotReceived}
              />
              {order.isDeliveredButNotReceived && (
                <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800 ring-1 ring-inset ring-rose-200">
                  Confirm receipt
                </span>
              )}
              {order.isDelayed && !order.isDeliveredButNotReceived && (
                <span className="text-xs font-medium text-slate-500">
                  {order.status}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-[17px] leading-snug font-semibold tracking-tight text-slate-900">
              {order.productName}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Order <span className="font-medium text-slate-700">{order.orderId}</span>
            </p>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-5 py-5">
        <section
          className={`rounded-2xl border px-4 py-4 shadow-sm ${
            order.isDelayed
              ? 'border-amber-200 bg-amber-50/40'
              : order.isDeliveredButNotReceived
                ? 'border-rose-200 bg-rose-50/30'
                : 'border-slate-200/80 bg-white'
          }`}
        >
          <p
            className={`text-xs font-medium tracking-wide uppercase ${
              order.isDelayed
                ? 'text-amber-800'
                : order.isDeliveredButNotReceived
                  ? 'text-rose-800'
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
            onTrackLiveLocation={() => {
              window.alert(
                `Live location for ${order.orderId} would open here.`,
              )
            }}
          />
        )}

        {order.isDeliveredButNotReceived && (
          <DeliveredNotReceivedAlert order={order} />
        )}

        {order.isTrackingUnavailable && (
          <p
            className="rounded-2xl border border-slate-200 bg-slate-100 px-3.5 py-3 text-sm leading-snug text-slate-700"
            role="status"
          >
            Tracking details are not available for this order yet.
          </p>
        )}

        {order.isTrackingUnavailable ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-700">
              Timeline unavailable
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Check back soon or reach out to support for updates.
            </p>
          </section>
        ) : (
          <OrderProgressStepper currentStatus={order.status} />
        )}
      </main>

      <footer className="mt-auto border-t border-slate-200/80 bg-white px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <ContactSupportButton orderId={order.orderId} />
      </footer>
    </TrackingScreenFrame>
  )
}
