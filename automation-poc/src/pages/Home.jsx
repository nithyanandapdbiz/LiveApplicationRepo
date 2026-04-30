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
    <div className="page" data-testid="home-page">
      <section className="hero" data-testid="hero-section">
        <div className="hero-content" data-testid="hero-content">
          <span className="hero-eyebrow" data-testid="hero-eyebrow">— New season · Spring 2026</span>
          <h1 className="hero-title" data-testid="hero-title">
            Curated goods.
            <br />
            <em>Delivered with care.</em>
          </h1>
          <p className="hero-lede" data-testid="hero-lede">
            A small selection of clothing, electronics, and accessories —
            handpicked from across the catalog. No noise, no clutter.
          </p>
          <div className="hero-cta" data-testid="hero-cta">
            <Link to="/products" className="btn btn-primary" data-testid="shop-catalog-btn">
              catalog →
            </Link>
            <Link to="/contact" className="btn btn-ghost" data-testid="get-in-touch-btn">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="hero-stats" data-testid="hero-stats">
          <div className="stat" data-testid="stat-products">
            <div className="stat-num">20+</div>
            <div className="stat-label">Prodct</div>
          </div>
          <div className="stat" data-testid="stat-categories">
            <div className="stat-num">4</div>
            <div className="stat-label">Categori</div>
          </div>
          <div className="stat" data-testid="stat-rating">
            <div className="stat-num">★ 4.0</div>
            <div className="stat-label">Avg. rating</div>
          </div>
        </div>
      </section>

      <section className="section" data-testid="featured-section">
        <div className="section-header" data-testid="featured-header">
          <h2>Featured products</h2>
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
