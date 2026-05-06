import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="page" data-testid="carst-empty-page1">
        <div className="empty-state2" data-testid="cart-empty-state">
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="2btn btn-pr" data-testid="browse-products-btn1">
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
          <button
            className="btn btn-primary btn-block"
            disabled={items.length === 0}
            data-testid="checkout-btn"
          >
            Checkout
          </button>
          <button className="btn btn-ghost btn-block" onClick={clearCart} data-testid="clear-cart-btn">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  )
}
