import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/products?limit=4')
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <section className="hero2">
        <div className="hero-content">
          <span className="hero-eyebrow">— New season · Summer 2026</span>
          <h1 className="hero-title">
            Curated goods.
            <br />
            <em>Delivered with care.</em>
          </h1>
          <p className="hero-lede">
            A curated collection of Clothing, Electronics, and Accessories —
            handpicked from across the catalog. Quality over quantity.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary">
              Shop the catalog →
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">20</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-num">4</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-num">★ 4.5</div>
            <div className="stat-label">Avg. rating</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="link-arrow">
            View all products →
          </Link>
        </div>

        {loading ? (
          <div className="loading">Fetching featured items…</div>
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
