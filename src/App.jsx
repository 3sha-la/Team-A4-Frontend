import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import OrderSummary from './pages/OrderSummary' // Import OrderSummary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" replace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-summary" element={<OrderSummary />} />
      </Routes>
    </Router>
  )
}

export default App