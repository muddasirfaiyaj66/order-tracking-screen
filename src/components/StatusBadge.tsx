import type { ReactNode } from 'react'
import type { OrderStatus } from '../types/order'

const STATUS_BADGE_STYLES: Record<OrderStatus, string> = {
  Processing: 'bg-sky-50 text-sky-800 ring-sky-200/80',
  Shipped: 'bg-indigo-50 text-indigo-800 ring-indigo-200/80',
  'Out for Delivery': 'bg-emerald-50 text-emerald-800 ring-emerald-200/80',
  Delivered: 'bg-teal-50 text-teal-800 ring-teal-200/80',
}

interface StatusBadgeProps {
  status: OrderStatus
  isDelayed?: boolean
}

export function StatusBadge({ status, isDelayed = false }: StatusBadgeProps) {
  const styles = isDelayed
    ? 'bg-amber-50 text-amber-900 ring-amber-200/80'
    : STATUS_BADGE_STYLES[status]

  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ring-1 ring-inset ${styles}`}
    >
      {isDelayed ? 'Delayed' : status}
    </span>
  )
}

export function MetaChip({
  children,
  tone = 'slate',
}: {
  children: ReactNode
  tone?: 'slate' | 'rose' | 'sky' | 'amber'
}) {
  const tones = {
    slate: 'bg-slate-100 text-slate-700 ring-slate-200/80',
    rose: 'bg-rose-50 text-rose-800 ring-rose-200/80',
    sky: 'bg-sky-50 text-sky-800 ring-sky-200/80',
    amber: 'bg-amber-50 text-amber-900 ring-amber-200/80',
  }

  return (
    <span
      className={`inline-flex max-w-full items-center truncate rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
