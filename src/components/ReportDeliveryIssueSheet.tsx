import { useState } from 'react'
import type { DeliveryIssueType, Order } from '../types/order'
import { ActionSheet } from './ActionSheet'

const ISSUE_OPTIONS: { type: DeliveryIssueType; label: string; hint: string }[] =
  [
    {
      type: 'not_received',
      label: 'I haven’t received this',
      hint: 'Marked delivered or expected, but missing',
    },
    {
      type: 'delayed',
      label: 'Delivery is delayed',
      hint: 'Past the estimated arrival window',
    },
    {
      type: 'damaged',
      label: 'Package arrived damaged',
      hint: 'Item or packaging was harmed in transit',
    },
    {
      type: 'wrong_item',
      label: 'Wrong item received',
      hint: 'Contents don’t match what I ordered',
    },
    {
      type: 'other',
      label: 'Something else',
      hint: 'Describe the problem in a follow-up email',
    },
  ]

interface ReportDeliveryIssueSheetProps {
  open: boolean
  order: Order
  defaultIssueType?: DeliveryIssueType
  onClose: () => void
  onSubmitted?: (issueType: DeliveryIssueType) => void
}

export function ReportDeliveryIssueSheet({
  open,
  order,
  defaultIssueType,
  onClose,
  onSubmitted,
}: ReportDeliveryIssueSheetProps) {
  const [selected, setSelected] = useState<DeliveryIssueType | null>(
    defaultIssueType ?? null,
  )
  const [submitted, setSubmitted] = useState(false)

  const handleClose = () => {
    onClose()
    // Reset after close animation frame so reopen feels fresh
    window.setTimeout(() => {
      setSelected(defaultIssueType ?? null)
      setSubmitted(false)
    }, 200)
  }

  const submitMailto = (issueType: DeliveryIssueType) => {
    const option = ISSUE_OPTIONS.find((item) => item.type === issueType)
    const subject = encodeURIComponent(
      `Delivery issue (${option?.label ?? issueType}) — ${order.orderId}`,
    )
    const body = encodeURIComponent(
      `Hi Support,\n\nI'd like to report a delivery issue for order ${order.orderId}.\n\nProduct: ${order.productName}\nIssue: ${option?.label ?? issueType}\nStatus: ${order.status}\n\nPlease help investigate.\n\nThanks,`,
    )
    window.location.href = `mailto:support@example.com?subject=${subject}&body=${body}`
  }

  return (
    <ActionSheet
      open={open}
      title={submitted ? 'Issue submitted' : 'Report a delivery issue'}
      description={
        submitted
          ? `We’ll follow up about order ${order.orderId}.`
          : `Order ${order.orderId} · ${order.productName}`
      }
      onClose={handleClose}
    >
      {submitted ? (
        <div className="pb-2">
          <p className="text-sm leading-relaxed text-slate-600">
            Thanks — your report is noted. You can also email support if you
            need to add more details.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {ISSUE_OPTIONS.map((option) => {
            const isActive = selected === option.type
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => setSelected(option.type)}
                className={`rounded-2xl border px-4 py-3 text-left transition active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span
                  className={`mt-0.5 block text-xs ${
                    isActive ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {option.hint}
                </span>
              </button>
            )
          })}

          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              if (!selected) return
              setSubmitted(true)
              onSubmitted?.(selected)
              submitMailto(selected)
            }}
            className="mt-2 flex w-full items-center justify-center rounded-2xl bg-rose-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            Submit report
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      )}
    </ActionSheet>
  )
}
