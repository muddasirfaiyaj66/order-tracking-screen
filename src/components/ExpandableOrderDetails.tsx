import { useId, useState } from 'react'
import type { Order } from '../types/order'
import { StatusBadge } from './StatusBadge'

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 text-slate-400 transition-transform duration-200 ${
        expanded ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

interface ExpandableOrderDetailsProps {
  order: Order
}

/** Tappable order/product summary that expands richer product info. */
export function ExpandableOrderDetails({ order }: ExpandableOrderDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const details = order.productDetails
  const lineTotal = details.unitPrice * details.quantity

  return (
    <div className="border-b border-slate-200/80 bg-white">
      <button
        type="button"
        className="flex w-full items-start gap-3.5 px-5 pt-5 pb-4 text-left transition hover:bg-slate-50/80 active:bg-slate-50"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
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
            {order.isTrackingUnavailable && (
              <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800 ring-1 ring-inset ring-sky-200">
                Tracking soon
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
            Order{' '}
            <span className="font-medium text-slate-700">{order.orderId}</span>
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500">
            {expanded ? 'Hide product details' : 'View product details'}
            <ChevronIcon expanded={expanded} />
          </p>
        </div>
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t border-slate-100 px-5 py-4">
            <p className="text-sm leading-relaxed text-slate-600">
              {details.description}
            </p>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Quantity</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {details.quantity}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Price</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {formatCurrency(lineTotal)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">SKU</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {details.sku}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Seller</dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {details.seller}
                </dd>
              </div>
              {details.color && (
                <div>
                  <dt className="text-xs text-slate-500">Color</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {details.color}
                  </dd>
                </div>
              )}
              {details.size && (
                <div>
                  <dt className="text-xs text-slate-500">Size</dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {details.size}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
