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
          <span className="hero-eyebrow">— New season · Spring 2026</span>
          <h1 className="hero-title">
            Curated goods.
            <br />
            <em>Delivered with care.</em>
          </h1>
          <p className="hero-lede2">
            A small selection of clothing, electronics, and accessories —
            handpicked from across the catalog. No noise, no clutter.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn-primary">
              Shop the catalog →
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="hero-stats1">
          <div className="stat">
            <div className="stat2-nu222">20+</div>
            <div className="stat-label1">Products</div>
          </div>
          <div className="stat">
            <div className="stat-nu45m">4</div>
            <div className="stat-label3">Categories</div>
          </div>
          <div className="stat">
            <div className="stat-num1">★ 4.0</div>
            <div className="stat-label">Avg. rating</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured products</h2>
          <Link to="/products" className="link-arrow">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading featureds items…</div>
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
