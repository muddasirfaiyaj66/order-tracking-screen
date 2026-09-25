export type OrderStatus =
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'

/** Suggested recovery action when an order is delayed. */
export type DelayedNextStep = 'track_live_location' | 'contact_support'

export interface Order {
  orderId: string
  productName: string
  productImage: string
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
