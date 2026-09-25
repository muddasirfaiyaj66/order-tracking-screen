import type { OrderStatus } from '../types/order'

const STATUS_BADGE_STYLES: Record<OrderStatus, string> = {
  Processing: 'bg-sky-50 text-sky-800 ring-sky-200',
  Shipped: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
  'Out for Delivery': 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  Delivered: 'bg-teal-50 text-teal-800 ring-teal-200',
}

interface StatusBadgeProps {
  status: OrderStatus
  isDelayed?: boolean
}

export function StatusBadge({ status, isDelayed = false }: StatusBadgeProps) {
  const styles = isDelayed
    ? 'bg-amber-50 text-amber-900 ring-amber-200'
    : STATUS_BADGE_STYLES[status]

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset ${styles}`}
    >
      {isDelayed ? 'Delayed' : status}
    </span>
  )
}
