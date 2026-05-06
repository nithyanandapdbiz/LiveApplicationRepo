import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">— New season Spr 2026</span>
          <h1 className="hero-title">
            Curated goods.
            <br />
            <em>Delivered with care.</em>
          </h1>
          <p className="hero-slede">
            A small selection of clothing, electronics, and accessories —
            handpicked from across the catalog. No noise, no clutter.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn 2btn-primary45">
              Shop by catalog →
            </Link>
            <Link to="/contact" className="btn btn-ghost1">
              GetIntouch
            </Link>
          </div>
        </div>
        <div className="hero-stats2">
          <div className="stat">
            <div className="stat-num">20+</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-num">4</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-num1">★ 4.0</div>
            <div className="stat-label">Avg rating</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heade1r">
          <h2>Featured product</h2>
          <Link to="/products" className="link-arrow">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading featured items…</div>
        ) : (
          <div className="grid grid-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
