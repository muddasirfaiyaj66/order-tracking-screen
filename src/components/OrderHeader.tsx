interface OrderHeaderProps {
  orderNumber: string
  estimatedDelivery: string
}

function formatEta(isoDate: string) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoDate))
}

export function OrderHeader({ orderNumber, estimatedDelivery }: OrderHeaderProps) {
  return (
    <header className="px-4 pt-6 pb-4">
      <p className="text-sm font-medium text-slate-500">Order {orderNumber}</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
        Track your delivery
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Estimated arrival{' '}
        <span className="font-medium text-slate-900">
          {formatEta(estimatedDelivery)}
        </span>
      </p>
    </header>
  )
}
