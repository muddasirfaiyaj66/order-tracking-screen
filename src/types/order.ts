export type OrderStatus =
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'

export interface Order {
  orderId: string
  productName: string
  productImage: string
  status: OrderStatus
  estimatedDeliveryDate: string
  orderDate: string
  /** Package is past the estimated delivery window. */
  isDelayed: boolean
  /** Carrier marked delivered, but customer reports it missing. */
  isDeliveredButNotReceived: boolean
  /** Tracking details cannot be loaded for this order. */
  isTrackingUnavailable: boolean
}
