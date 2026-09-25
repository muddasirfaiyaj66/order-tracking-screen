import type { Order } from '../types/order'
import { DeliveryInfo } from './DeliveryInfo'
import { OrderHeader } from './OrderHeader'
import { OrderItems } from './OrderItems'
import { StatusTracker } from './StatusTracker'

interface OrderTrackingScreenProps {
  order: Order
}

export function OrderTrackingScreen({ order }: OrderTrackingScreenProps) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-md bg-slate-50">
      <OrderHeader
        orderNumber={order.orderNumber}
        estimatedDelivery={order.delivery.estimatedDelivery}
      />
      <StatusTracker steps={order.trackingSteps} />
      <DeliveryInfo delivery={order.delivery} />
      <OrderItems items={order.items} total={order.total} />
    </div>
  )
}
