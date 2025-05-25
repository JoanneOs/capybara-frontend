import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          CapyShop
        </Link>
        <div className="nav-links">
          <Link to="/shop">Shop</Link>
          <Link to="/cart" className="cart-link">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}