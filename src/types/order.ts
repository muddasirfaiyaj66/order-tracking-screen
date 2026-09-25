export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  imageUrl?: string
}

export interface TrackingStep {
  id: string
  status: OrderStatus
  label: string
  description: string
  timestamp: string | null
  completed: boolean
  current: boolean
}

export interface DeliveryInfo {
  carrier: string
  trackingNumber: string
  estimatedDelivery: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    zip: string
  }
  courierName?: string
  courierPhone?: string
}

export interface Order {
  id: string
  orderNumber: string
  placedAt: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  delivery: DeliveryInfo
  trackingSteps: TrackingStep[]
}
