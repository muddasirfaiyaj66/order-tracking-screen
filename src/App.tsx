import { useState } from 'react'
import { OrderListScreen } from './components/OrderListScreen'
import { OrderTrackingErrorState } from './components/OrderTrackingErrorState'
import { OrderTrackingScreen } from './components/OrderTrackingScreen'
import { OrderTrackingSkeleton } from './components/OrderTrackingSkeleton'
import { mockOrders } from './data/mockOrders'
import { useOrderTracking } from './hooks/useOrderTracking'

interface OrderTrackingRouteProps {
  orderId: string
  onBack: () => void
}

function OrderTrackingRoute({ orderId, onBack }: OrderTrackingRouteProps) {
  const { status, order, errorMessage, reload } = useOrderTracking(orderId)

  if (status === 'loading') {
    return <OrderTrackingSkeleton />
  }

  if (status === 'error') {
    return (
      <OrderTrackingErrorState
        variant="error"
        orderId={orderId}
        message={errorMessage ?? undefined}
        onRetry={reload}
      />
    )
  }

  if (status === 'empty' || !order) {
    return (
      <OrderTrackingErrorState
        variant="empty"
        orderId={orderId}
        message={errorMessage ?? undefined}
        onRetry={reload}
      />
    )
  }

  return (
    <OrderTrackingScreen
      order={order}
      onRefreshTracking={reload}
      onBack={onBack}
    />
  )
}

function App() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  if (!selectedOrderId) {
    return (
      <OrderListScreen
        orders={mockOrders}
        onSelectOrder={setSelectedOrderId}
      />
    )
  }

  return (
    <OrderTrackingRoute
      orderId={selectedOrderId}
      onBack={() => setSelectedOrderId(null)}
    />
  )
}

export default App
