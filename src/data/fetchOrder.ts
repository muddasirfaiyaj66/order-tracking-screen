import type { Order } from '../types/order'
import { mockOrders } from './mockOrders'

const LOAD_DELAY_MS = 1100

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(`No tracking data found for order ${orderId}`)
    this.name = 'OrderNotFoundError'
  }
}

/**
 * Simulated order fetch for the tracking screen.
 * Pass `OT-FAIL` to force a network-style error (for demos).
 */
export async function fetchOrderById(orderId: string): Promise<Order> {
  await delay(LOAD_DELAY_MS)

  if (orderId === 'OT-FAIL') {
    throw new Error('Failed to load tracking data')
  }

  const order = mockOrders.find((item) => item.orderId === orderId)
  if (!order) {
    throw new OrderNotFoundError(orderId)
  }

  return order
}
