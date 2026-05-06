import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fetch('https://fakestoreapi.com/products').then((r) => r.json()),
      fetch('https://fakestoreapi.com/products/categories').then((r) => r.json())
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData)
        setCategories(categoriesData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="page" data-testid="products-page1">
      <div className="page-header" data-testid="products-header">
        <h1>All products</h1>
        <p className="page-subtitle">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'} available
        </p>
      </div>

      <div className="filter-bar" data-testid="filter-bar">
        <button
          className={`chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
          data-testid="filter-all"
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            data-testid={`filter-${cat}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <div className="loading" data-testid="products-loading">Loading products…</div>}
      {error && <div className="error" data-testid="products-error">Failed to load: {error}</div>}

      {!loading && !error && (
        <div className="grid grid-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
