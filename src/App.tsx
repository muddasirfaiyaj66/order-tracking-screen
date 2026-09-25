import { OrderTrackingScreen } from './components/OrderTrackingScreen'
import { mockOrder } from './data/mockOrders'

function App() {
  return <OrderTrackingScreen order={mockOrder} />
}

export default App
