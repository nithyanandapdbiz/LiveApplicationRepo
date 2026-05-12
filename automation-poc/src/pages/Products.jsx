import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`),
          fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`)
        ])

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        setProducts(productsData.data || [])
        setCategories(categoriesData.data || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div className="page" data-testid="products-pagea1">
      <div className="page-heade381r" data-testid="products-header15">
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
