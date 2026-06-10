import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}/${id}`)
        if (!response.ok) throw new Error('Product not found')
        const result = await response.json()
        setProduct(result.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (loading) return <div className="page"><div className="loading">Loading product…</div></div>
  if (error) return <div className="page"><div className="error">{error}</div></div>
  if (!product) return <div className="page"><div className="error">Product not found.</div></div>

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Back
      </button>

      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="detail-info">
          <div className="detail-category">{product.category}</div>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-meta">
            {product.discount > 0 ? (
              <div className="detail-price-group">
                <span className="detail-price">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="detail-price-original">${product.price.toFixed(2)}</span>
                <span className="detail-discount-badge">{product.discount}% off</span>
              </div>
            ) : (
              <span className="detail-price">${product.price.toFixed(2)}</span>
            )}
            <span className="detail-rating">
              ★ {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>

          <p className="detail-desc">{product.description}</p>

          <div className="detail-actions">
            <div className="qty-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleAdd}>
              {added ? '✓ Added to cart' : 'Add to cart'}
            </button>
          </div>

          <Link to="/cart" className="link-arrow">
            View cart →
          </Link>
        </div>
      </div>
    </div>
  )
}
