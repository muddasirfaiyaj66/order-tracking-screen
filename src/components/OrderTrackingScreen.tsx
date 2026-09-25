import type { Order, OrderStatus } from '../types/order'

const STATUS_FLOW: OrderStatus[] = [
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
]

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(isoDate))
}

interface OrderTrackingScreenProps {
  order: Order
}

export function OrderTrackingScreen({ order }: OrderTrackingScreenProps) {
  const currentIndex = STATUS_FLOW.indexOf(order.status)

  return (
    <div className="mx-auto min-h-dvh w-full max-w-md bg-slate-50">
      <header className="px-4 pt-6 pb-4">
        <p className="text-sm font-medium text-slate-500">Order {order.orderId}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Track your delivery
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ordered {formatDate(order.orderDate)} · ETA{' '}
          <span className="font-medium text-slate-900">
            {formatDate(order.estimatedDeliveryDate)}
          </span>
        </p>
      </header>

      {(order.isDelayed ||
        order.isDeliveredButNotReceived ||
        order.isTrackingUnavailable) && (
        <div className="mx-4 mb-4 space-y-2">
          {order.isDelayed && (
            <p
              className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
              role="status"
            >
              This order is delayed past the estimated delivery date.
            </p>
          )}
          {order.isDeliveredButNotReceived && (
            <p
              className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900"
              role="status"
            >
              Marked delivered, but not received — contact support if needed.
            </p>
          )}
          {order.isTrackingUnavailable && (
            <p
              className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700"
              role="status"
            >
              Tracking details are not available for this order yet.
            </p>
          )}
        </div>
      )}

      <section className="mx-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex gap-3">
          <img
            src={order.productImage}
            alt=""
            className="size-16 shrink-0 rounded-xl bg-slate-100 object-cover"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">{order.productName}</p>
            <p className="mt-1 text-sm text-slate-500">Status: {order.status}</p>
          </div>
        </div>
      </section>

      {!order.isTrackingUnavailable && (
        <section className="px-4 py-6" aria-label="Delivery progress">
          <ol className="space-y-0">
            {STATUS_FLOW.map((step, index) => {
              const completed = index < currentIndex
              const current = index === currentIndex
              const isLast = index === STATUS_FLOW.length - 1

              return (
                <li key={step} className="relative flex gap-3 pb-6 last:pb-0">
                  {!isLast && (
                    <span
                      className={`absolute top-3 left-[11px] h-[calc(100%-0.75rem)] w-0.5 ${
                        completed ? 'bg-emerald-400' : 'bg-slate-200'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative z-10 mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      current || completed
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-slate-300 bg-white'
                    }`}
                    aria-hidden="true"
                  >
                    {(completed || current) && (
                      <span className="size-2 rounded-full bg-white" />
                    )}
                  </span>
                  <p
                    className={`pt-0.5 text-sm font-semibold ${
                      current || completed ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step}
                  </p>
                </li>
              )
            })}
          </ol>
        </section>
      )}
    </div>
  )
}
