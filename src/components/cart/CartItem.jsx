import './CartItem.css'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image.url} alt={item.name} />
      </div>
      
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="price">${item.price.toFixed(2)}</p>
        
        <div className="quantity-controls">
          <button 
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>
            +
          </button>
        </div>
        
        <button 
          onClick={() => onRemove(item._id)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
      
      <div className="item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  )
}