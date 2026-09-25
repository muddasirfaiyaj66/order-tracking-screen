import { OrderTrackingErrorState } from './components/OrderTrackingErrorState'
import { OrderTrackingScreen } from './components/OrderTrackingScreen'
import { OrderTrackingSkeleton } from './components/OrderTrackingSkeleton'
import { notReceivedMockOrder } from './data/mockOrders'
import { useOrderTracking } from './hooks/useOrderTracking'

function App() {
  const { status, order, errorMessage, reload } = useOrderTracking(
    notReceivedMockOrder.orderId,
  )

  if (status === 'loading') {
    return <OrderTrackingSkeleton />
  }

  if (status === 'error') {
    return (
      <OrderTrackingErrorState
        variant="error"
        orderId={notReceivedMockOrder.orderId}
        message={errorMessage ?? undefined}
        onRetry={reload}
      />
    )
  }

  if (status === 'empty' || !order) {
    return (
      <OrderTrackingErrorState
        variant="empty"
        orderId={notReceivedMockOrder.orderId}
        message={errorMessage ?? undefined}
        onRetry={reload}
      />
    )
  }

  return <OrderTrackingScreen order={order} />
}

export default App
