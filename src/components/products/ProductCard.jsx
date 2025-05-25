import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const imageUrl = product?.image?.url || '/placeholder.jpg'; // fallback image

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.name || 'Product image'} 
          className="product-image"
          loading="lazy"
        />
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
        >
          <span>+</span>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
