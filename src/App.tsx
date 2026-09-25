import { OrderTrackingScreen } from './components/OrderTrackingScreen'
import { mockOrder } from './data/mockOrder'

function App() {
  return <OrderTrackingScreen order={mockOrder} />
}

export default App
