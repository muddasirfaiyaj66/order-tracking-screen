export type OrderStatus =
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'

/** Suggested recovery action when an order is delayed. */
export type DelayedNextStep = 'track_live_location' | 'contact_support'

export type DeliveryIssueType =
  | 'not_received'
  | 'damaged'
  | 'wrong_item'
  | 'delayed'
  | 'other'

export interface ProductDetails {
  description: string
  quantity: number
  unitPrice: number
  sku: string
  seller: string
  color?: string
  size?: string
}

export interface Order {
  orderId: string
  productName: string
  productImage: string
  productDetails: ProductDetails
  status: OrderStatus
  /** Current best estimated delivery date (revised when delayed). */
  estimatedDeliveryDate: string
  /** Previous ETA before a delay revision. */
  originalEstimatedDeliveryDate?: string
  orderDate: string
  /** Package is past the estimated delivery window. */
  isDelayed: boolean
  /** Short explanation shown in the delay banner. */
  delayReason?: string
  /** Primary action suggested to the customer while delayed. */
  suggestedNextStep?: DelayedNextStep
  /** Carrier marked delivered, but customer reports it missing. */
  isDeliveredButNotReceived: boolean
  /** Tracking details cannot be loaded for this order. */
  isTrackingUnavailable: boolean
}
