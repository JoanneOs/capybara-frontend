import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../utilities/products-api'
import { useCart } from '../../context/CartContext'
import { toast } from 'react-hot-toast'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${quantity} ${product.name}(s) added to cart!`)
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div className="not-found">Product not found</div>

  return (
    <div className="product-detail">
      <div className="product-images">
        <img src={product.image.url} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>
        
        <div className="quantity-selector">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        
        <button 
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}