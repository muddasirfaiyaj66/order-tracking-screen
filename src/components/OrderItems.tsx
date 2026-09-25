import type { OrderItem } from '../types/order'

interface OrderItemsProps {
  items: OrderItem[]
  total: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function OrderItems({ items, total }: OrderItemsProps) {
  return (
    <section className="mx-4 mt-4 mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Order items</h2>
        <p className="text-sm font-semibold text-slate-900">
          {formatCurrency(total)}
        </p>
      </div>

      <ul className="mt-3 divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt=""
                className="size-14 shrink-0 rounded-xl bg-slate-100 object-cover"
              />
            ) : (
              <div className="size-14 shrink-0 rounded-xl bg-slate-100" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {item.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Qty {item.quantity}</p>
            </div>
            <p className="shrink-0 text-sm font-medium text-slate-900">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
