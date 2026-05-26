import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [orderId, setOrderId] = useState(null)

  const handleCheckout = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDERS}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ id, quantity }) => ({ id, quantity })),
          total: totalPrice,
          customerEmail: email
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')
      setOrderId(data.data.id)
      clearCart()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="page" data-testid="order-success-page">
        <div className="empty-state" data-testid="order-success-state">
          <h1>Order placed!</h1>
          <p>Thanks! Your order <strong>#{orderId}</strong> is confirmed. We'll be in touch at {email}.</p>
          <Link to="/products" className="btn btn-primary" data-testid="continue-shopping-btn">
            Continue shopping →
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page" data-testid="cart-empty-page">
        <div className="empty-state" data-testid="cart-empty-state">
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary" data-testid="browse-products-btn">
            Browse products →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page" data-testid="cart-page">
      <div className="page-header" data-testid="cart-header">
        <h1>Your cart</h1>
        <p className="page-subtitle">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="cart-layout" data-testid="cart-layout">
        <div className="cart-items" data-testid="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item" data-testid={`cart-item-${item.id}`}>
              <img src={item.image} alt={item.title} className="cart-item-img" data-testid="cart-item-img" />
              <div className="cart-item-info" data-testid="cart-item-info">
                <Link to={`/products/${item.id}`} className="cart-item-title" data-testid="cart-item-title">
                  {item.title}
                </Link>
                <div className="cart-item-meta">${item.price.toFixed(2)} each</div>
              </div>
              <div className="cart-item-controls" data-testid="cart-item-controls">
                <div className="qty-control" data-testid="cart-qty-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} data-testid="cart-qty-decrement">−</button>
                  <span data-testid="cart-qty-value">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} data-testid="cart-qty-increment">+</button>
                </div>
                <div className="cart-item-total" data-testid="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove"
                  data-testid="cart-remove-btn"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <aside className="cart-summary" data-testid="cart-summary">
          <div className="summary-row" data-testid="cart-summary-subtotal">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row" data-testid="cart-summary-shipping">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total" data-testid="cart-summary-total">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <input
            type="email"
            className="email-input"
            placeholder="Your email for order confirmation"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="checkout-email-input"
          />
          {error && <div className="error" data-testid="checkout-error">{error}</div>}
          <button
            className="btn btn-primary btn-block"
            disabled={loading || !email}
            onClick={handleCheckout}
            data-testid="checkout-btn"
          >
            {loading ? 'Placing order…' : 'Checkout'}
          </button>
          <button className="btn btn-ghost btn-block" onClick={clearCart} data-testid="clear-cart-btn">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}
