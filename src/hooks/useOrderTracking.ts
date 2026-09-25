import { useCallback, useEffect, useState } from 'react'
import type { Order } from '../types/order'
import { fetchOrderById, OrderNotFoundError } from '../data/fetchOrder'

export type TrackingLoadStatus = 'loading' | 'success' | 'error' | 'empty'

interface UseOrderTrackingResult {
  status: TrackingLoadStatus
  order: Order | null
  errorMessage: string | null
  reload: () => void
}

export function useOrderTracking(orderId: string): UseOrderTrackingResult {
  const [status, setStatus] = useState<TrackingLoadStatus>('loading')
  const [order, setOrder] = useState<Order | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [requestId, setRequestId] = useState(0)

  const reload = useCallback(() => {
    setRequestId((id) => id + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    setStatus('loading')
    setOrder(null)
    setErrorMessage(null)

    fetchOrderById(orderId)
      .then((result) => {
        if (cancelled) return
        setOrder(result)
        setStatus('success')
      })
      .catch((error: unknown) => {
        if (cancelled) return
        if (error instanceof OrderNotFoundError) {
          setStatus('empty')
          setErrorMessage(error.message)
          return
        }
        setStatus('error')
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load tracking data',
        )
      })

    return () => {
      cancelled = true
    }
  }, [orderId, requestId])

  return { status, order, errorMessage, reload }
}
