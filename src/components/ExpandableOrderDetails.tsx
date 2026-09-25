import { useId, useState } from 'react'
import type { Order } from '../types/order'
import { MetaChip, StatusBadge } from './StatusBadge'

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
      className={`size-3.5 text-slate-400 transition-transform duration-200 ${
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
    <div className="border-b border-slate-200 bg-white">
      <button
        type="button"
        className="tracking-screen-gutter flex w-full items-start gap-3 pt-3 pb-4 text-left transition hover:bg-slate-50/70 active:bg-slate-50"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((value) => !value)}
      >
        <img
          src={order.productImage}
          alt=""
          className="size-14 shrink-0 rounded-xl bg-slate-100 object-cover ring-1 ring-slate-200 min-[390px]:size-16 min-[390px]:rounded-2xl"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge
              status={order.status}
              isDelayed={order.isDelayed && !order.isDeliveredButNotReceived}
            />
            {order.isDeliveredButNotReceived && (
              <MetaChip tone="rose">Confirm receipt</MetaChip>
            )}
            {order.isTrackingUnavailable && (
              <MetaChip tone="sky">Tracking soon</MetaChip>
            )}
            {order.isDelayed && !order.isDeliveredButNotReceived && (
              <MetaChip tone="slate">{order.status}</MetaChip>
            )}
          </div>
          <h1 className="mt-2 text-base leading-snug font-semibold tracking-tight text-slate-900 min-[390px]:text-[17px]">
            {order.productName}
          </h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Order{' '}
            <span className="font-medium text-slate-700">{order.orderId}</span>
          </p>
          <p className="mt-2 inline-flex items-center gap-1 text-[12px] font-medium text-slate-500">
            {expanded ? 'Hide details' : 'View details'}
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
          <div className="tracking-screen-gutter space-y-3 border-t border-slate-100 py-3.5">
            <p className="text-[13px] leading-relaxed text-slate-600">
              {details.description}
            </p>
            <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-[13px]">
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                  Quantity
                </dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {details.quantity}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                  Price
                </dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {formatCurrency(lineTotal)}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                  SKU
                </dt>
                <dd className="mt-0.5 break-all font-medium text-slate-900">
                  {details.sku}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                  Seller
                </dt>
                <dd className="mt-0.5 font-medium text-slate-900">
                  {details.seller}
                </dd>
              </div>
              {details.color && (
                <div>
                  <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                    Color
                  </dt>
                  <dd className="mt-0.5 font-medium text-slate-900">
                    {details.color}
                  </dd>
                </div>
              )}
              {details.size && (
                <div>
                  <dt className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                    Size
                  </dt>
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
