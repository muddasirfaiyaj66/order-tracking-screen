import type { Order } from '../types/order'

/**
 * Sample orders covering each status plus the three edge-case scenarios:
 * delayed, delivered-but-not-received, and tracking-not-available.
 */
export const mockOrders: Order[] = [
  {
    orderId: 'OT-1001',
    productName: 'Wireless Noise-Cancelling Headphones',
    productImage: 'https://placehold.co/96x96/e2e8f0/64748b?text=Audio',
    status: 'Processing',
    estimatedDeliveryDate: '2026-09-30',
    orderDate: '2026-09-25',
    isDelayed: false,
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-1002',
    productName: 'USB-C Fast Charger 65W',
    productImage: 'https://placehold.co/96x96/e2e8f0/64748b?text=Power',
    status: 'Shipped',
    estimatedDeliveryDate: '2026-09-28',
    orderDate: '2026-09-22',
    isDelayed: false,
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-1003',
    productName: 'Braided Charging Cable 2m',
    productImage: 'https://placehold.co/96x96/e2e8f0/64748b?text=Cable',
    status: 'Out for Delivery',
    estimatedDeliveryDate: '2026-09-25',
    orderDate: '2026-09-20',
    isDelayed: false,
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-1004',
    productName: 'Compact Bluetooth Speaker',
    productImage: 'https://placehold.co/96x96/e2e8f0/64748b?text=Speaker',
    status: 'Delivered',
    estimatedDeliveryDate: '2026-09-23',
    orderDate: '2026-09-18',
    isDelayed: false,
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-2001',
    productName: 'Ergonomic Laptop Stand',
    productImage: 'https://placehold.co/96x96/fef3c7/92400e?text=Stand',
    status: 'Shipped',
    /** Revised ETA after delay */
    estimatedDeliveryDate: '2026-09-27',
    originalEstimatedDeliveryDate: '2026-09-21',
    orderDate: '2026-09-15',
    isDelayed: true,
    delayReason:
      'Carrier reported a regional transit delay. Your package is still en route.',
    suggestedNextStep: 'track_live_location',
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-2002',
    productName: 'Ceramic Pour-Over Coffee Set',
    productImage: 'https://placehold.co/96x96/fee2e2/991b1b?text=Coffee',
    status: 'Delivered',
    estimatedDeliveryDate: '2026-09-24',
    orderDate: '2026-09-19',
    isDelayed: false,
    isDeliveredButNotReceived: true,
    isTrackingUnavailable: false,
  },
  {
    orderId: 'OT-2003',
    productName: 'Merino Wool Travel Scarf',
    productImage: 'https://placehold.co/96x96/e0e7ff/3730a3?text=Scarf',
    status: 'Processing',
    estimatedDeliveryDate: '2026-10-02',
    orderDate: '2026-09-24',
    isDelayed: false,
    isDeliveredButNotReceived: false,
    isTrackingUnavailable: true,
  },
]

/** Default order used by the tracking screen (happy-path: out for delivery). */
export const mockOrder: Order = mockOrders[2]

/** Delayed order sample for the delay edge-case screen. */
export const delayedMockOrder: Order = mockOrders[4]

/** Delivered-but-not-received sample for the receipt confirmation edge case. */
export const notReceivedMockOrder: Order = mockOrders[5]

/** Tracking-not-available sample — order exists, carrier feed not ready yet. */
export const trackingUnavailableMockOrder: Order = mockOrders[6]
