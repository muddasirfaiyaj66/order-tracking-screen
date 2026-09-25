import { useState } from 'react'
import type { Order } from '../types/order'

function AlertIcon({ className }: { className?: string }) {
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
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

interface DeliveredNotReceivedAlertProps {
  order: Order
  onConfirmReceipt?: () => void
  onReportIssue: () => void
}

type ReceiptOutcome = 'idle' | 'confirmed' | 'reported'

export function DeliveredNotReceivedAlert({
  order,
  onConfirmReceipt,
  onReportIssue,
}: DeliveredNotReceivedAlertProps) {
  const [outcome, setOutcome] = useState<ReceiptOutcome>('idle')

  if (!order.isDeliveredButNotReceived) return null

  if (outcome === 'confirmed') {
    return (
      <section
        className="rounded-2xl border border-teal-200 bg-teal-50 px-3.5 py-3.5 shadow-[0_1px_2px_rgb(15_23_42/0.04)] min-[390px]:px-4"
        role="status"
      >
        <div className="flex gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 ring-1 ring-teal-200/80 min-[390px]:size-9">
            <CheckIcon className="size-4 min-[390px]:size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-teal-950 min-[390px]:text-sm">
              Thanks for confirming
            </p>
            <p className="mt-1 text-[13px] leading-snug text-teal-900/85">
              We’ve marked order {order.orderId} as received.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (outcome === 'reported') {
    return (
      <section
        className="rounded-2xl border border-rose-200 bg-rose-50 px-3.5 py-3.5 shadow-[0_1px_2px_rgb(15_23_42/0.04)] min-[390px]:px-4"
        role="status"
      >
        <div className="flex gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 ring-1 ring-rose-200/80 min-[390px]:size-9">
            <AlertIcon className="size-4 min-[390px]:size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-rose-950 min-[390px]:text-sm">
              Issue reported
            </p>
            <p className="mt-1 text-[13px] leading-snug text-rose-900/85">
              Support will follow up about order {order.orderId}.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="overflow-hidden rounded-2xl border border-rose-200 bg-rose-50 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
      role="alert"
      aria-label="Confirm delivery receipt"
    >
      <div className="flex gap-3 px-3.5 py-3.5 min-[390px]:px-4">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 ring-1 ring-rose-200/80 min-[390px]:size-9">
          <AlertIcon className="size-4 min-[390px]:size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-rose-950 min-[390px]:text-sm">
            Marked as delivered — please confirm
          </p>
          <p className="mt-1 text-[13px] leading-snug text-rose-900/90">
            The carrier marked this order delivered. If you haven’t received
            your package, report it so we can investigate.
          </p>
        </div>
      </div>

      <div className="border-t border-rose-200/80 bg-rose-100/35 px-3.5 py-3 min-[390px]:px-4">
        <p className="eyebrow text-rose-800/80">Carrier status</p>
        <p className="mt-1 text-[13px] font-semibold text-slate-900">Delivered</p>
        <p className="mt-0.5 text-[12px] text-rose-800/80">
          Awaiting your receipt confirmation
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-rose-200/80 px-3.5 py-3 min-[390px]:px-4">
        <button
          type="button"
          onClick={() => {
            setOutcome('reported')
            onReportIssue()
          }}
          className="touch-target flex w-full items-center justify-center rounded-xl bg-rose-700 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-rose-800 active:scale-[0.99]"
        >
          I haven&apos;t received this
        </button>
        <button
          type="button"
          onClick={() => {
            setOutcome('reported')
            onReportIssue()
          }}
          className="touch-target flex w-full items-center justify-center rounded-xl border border-rose-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-rose-900 transition hover:bg-rose-50 active:scale-[0.99]"
        >
          Report an issue
        </button>
        <button
          type="button"
          onClick={() => {
            setOutcome('confirmed')
            onConfirmReceipt?.()
          }}
          className="flex w-full items-center justify-center rounded-xl px-4 py-2 text-[13px] font-semibold text-rose-900/80 transition hover:bg-rose-100/70 active:scale-[0.99]"
        >
          Yes, I received it
        </button>
      </div>
    </section>
  )
}
