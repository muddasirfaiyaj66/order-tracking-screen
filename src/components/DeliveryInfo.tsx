import type { DeliveryInfo as DeliveryInfoType } from '../types/order'

interface DeliveryInfoProps {
  delivery: DeliveryInfoType
}

export function DeliveryInfo({ delivery }: DeliveryInfoProps) {
  const { address, carrier, trackingNumber, courierName, courierPhone } =
    delivery

  return (
    <section className="mx-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Delivery details</h2>

      <dl className="mt-3 space-y-3 text-sm">
        <div>
          <dt className="text-slate-500">Ship to</dt>
          <dd className="mt-0.5 font-medium text-slate-900">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ''}
            <br />
            {address.city}, {address.state} {address.zip}
          </dd>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <dt className="text-slate-500">Carrier</dt>
            <dd className="mt-0.5 font-medium text-slate-900">{carrier}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Tracking #</dt>
            <dd className="mt-0.5 font-medium break-all text-slate-900">
              {trackingNumber}
            </dd>
          </div>
        </div>

        {(courierName || courierPhone) && (
          <div>
            <dt className="text-slate-500">Courier</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              {courierName}
              {courierPhone ? (
                <>
                  <br />
                  <a
                    href={`tel:${courierPhone.replace(/\s+/g, '')}`}
                    className="text-emerald-700 underline-offset-2 hover:underline"
                  >
                    {courierPhone}
                  </a>
                </>
              ) : null}
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}
