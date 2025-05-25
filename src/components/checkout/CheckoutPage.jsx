import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      clearCart()
      setOrderSuccess(true)
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (orderSuccess) {
    return (
      <div className="order-success">
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
        <p>A confirmation email has been sent to {formData.email}</p>
        <a href="/shop" className="back-to-shop">
          Continue Shopping
        </a>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Shipping Information</h2>
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="zip">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <h2>Payment Details</h2>
          
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expDate">Expiration Date</label>
              <input
                type="text"
                id="expDate"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="submit-order"
            disabled={isProcessing || cart.length === 0}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </form>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cart.map(item => (
              <div key={item._id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}