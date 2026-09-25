import type { Order } from '../types/order'
import { ActionSheet } from './ActionSheet'

interface ContactSupportSheetProps {
  open: boolean
  order: Order
  onClose: () => void
  onReportIssue: () => void
}

function SheetAction({
  label,
  description,
  onClick,
  href,
}: {
  label: string
  description: string
  onClick?: () => void
  href?: string
}) {
  const className =
    'flex w-full flex-col rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left transition hover:bg-slate-100 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400'

  if (href) {
    return (
      <a href={href} className={className}>
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        <span className="mt-0.5 text-xs text-slate-500">{description}</span>
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span className="text-sm font-semibold text-slate-900">{label}</span>
      <span className="mt-0.5 text-xs text-slate-500">{description}</span>
    </button>
  )
}

export function ContactSupportSheet({
  open,
  order,
  onClose,
  onReportIssue,
}: ContactSupportSheetProps) {
  const emailHref = (() => {
    const subject = encodeURIComponent(`Support request for order ${order.orderId}`)
    const body = encodeURIComponent(
      `Hi Support,\n\nI need help with order ${order.orderId} (${order.productName}).\n\nThanks,`,
    )
    return `mailto:support@example.com?subject=${subject}&body=${body}`
  })()

  return (
    <ActionSheet
      open={open}
      title="Contact Support"
      description={`Order ${order.orderId}`}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2.5">
        <SheetAction
          label="Email support"
          description="Open your mail app with order details prefilled"
          href={emailHref}
        />
        <SheetAction
          label="Call support"
          description="Speak with an agent · +1 (800) 555-0142"
          href="tel:+18005550142"
        />
        <SheetAction
          label="Report a delivery issue"
          description="Package delayed, missing, damaged, or wrong item"
          onClick={() => {
            onClose()
            onReportIssue()
          }}
        />
        <button
          type="button"
          onClick={onClose}
          className="mt-1 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </ActionSheet>
  )
}
