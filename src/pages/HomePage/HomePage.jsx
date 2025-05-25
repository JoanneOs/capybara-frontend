import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllProducts } from '../../utilities/products-api'
import ProductCard from '../../components/products/ProductCard'
import './HomePage.css'

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeatured() {
      try {
        const products = await getAllProducts()
        // Get first 4 products as featured (or implement real featured logic)
        setFeaturedProducts(products.slice(0, 4))
      } catch (error) {
        console.error('Error loading featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFeatured()
  }, [])

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CapyShop</h1>
          <p>Your one-stop shop for all things capybara!</p>
          <Link to="/shop" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}