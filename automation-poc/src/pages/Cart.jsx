import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="page">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary">
            Browse products →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Your cart</h1>
        <p className="page-subtitle">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <Link to={`/products/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <div className="cart-item-meta">${item.price.toFixed(2)} each</div>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => alert('Checkout is not implemented in this POC.')}
          >
            Proceed to checkout
          </button>
          <button className="btn btn-ghost btn-block" onClick={clearCart}>
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}
