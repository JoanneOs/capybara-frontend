import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import { CartProvider } from './context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import { Toaster } from 'react-hot-toast'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </CartProvider>
  )
}