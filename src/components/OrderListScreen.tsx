import type { Order } from '../types/order'
import { MetaChip, StatusBadge } from './StatusBadge'
import { TrackingScreenFrame } from './TrackingScreenFrame'

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${isoDate}T12:00:00`))
}

function edgeLabel(order: Order): { text: string; tone: 'amber' | 'rose' | 'sky' } | null {
  if (order.isDelayed) return { text: 'Delayed', tone: 'amber' }
  if (order.isDeliveredButNotReceived) return { text: 'Confirm receipt', tone: 'rose' }
  if (order.isTrackingUnavailable) return { text: 'Tracking soon', tone: 'sky' }
  return null
}

interface OrderListScreenProps {
  orders: Order[]
  onSelectOrder: (orderId: string) => void
}

/** Lists every mock order so each status / edge case is reachable. */
export function OrderListScreen({ orders, onSelectOrder }: OrderListScreenProps) {
  return (
    <TrackingScreenFrame>
      <header className="tracking-screen-gutter border-b border-slate-200 bg-white pt-4 pb-4">
        <p className="eyebrow">Your orders</p>
        <h1 className="mt-1.5 text-lg font-semibold tracking-tight text-slate-900">
          Track a delivery
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          {orders.length} orders · tap one to view tracking
        </p>
      </header>

      <main className="tracking-screen-gutter flex flex-1 flex-col gap-2.5 py-4">
        <ul className="flex flex-col gap-2.5">
          {orders.map((order) => {
            const edge = edgeLabel(order)

            return (
              <li key={order.orderId}>
                <button
                  type="button"
                  onClick={() => onSelectOrder(order.orderId)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-left shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition hover:border-slate-300 hover:bg-slate-50/80 active:scale-[0.99]"
                >
                  <img
                    src={order.productImage}
                    alt=""
                    className="size-14 shrink-0 rounded-xl bg-slate-100 object-cover ring-1 ring-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusBadge
                        status={order.status}
                        isDelayed={
                          order.isDelayed && !order.isDeliveredButNotReceived
                        }
                      />
                      {edge && edge.text !== 'Delayed' && (
                        <MetaChip tone={edge.tone}>{edge.text}</MetaChip>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-slate-900">
                      {order.productName}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500">
                      {order.orderId}
                      <span className="text-slate-300"> · </span>
                      ETA {formatDate(order.estimatedDeliveryDate)}
                    </p>
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-4 size-4 shrink-0 text-slate-300"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
      </main>
    </TrackingScreenFrame>
  )
}
