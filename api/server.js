import './tracing.js';
import express from 'express';
import cors from 'cors';
import { 
  products, 
  categories, 
  getProductById, 
  getProductsByCategory, 
  createOrder 
} from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============ PRODUCT ENDPOINTS ============

/**
 * GET /api/products
 * Get all products with optional filtering
 * Query params: ?category=electronics&limit=10&skip=0
 */
app.get('/api/products', (req, res) => {
  try {
    const { category, limit = 20, skip = 0 } = req.query;
    
    let result = category 
      ? getProductsByCategory(category)
      : products;
    
    // Pagination
    result = result.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
    
    res.json({
      success: true,
      data: result,
      total: products.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/products/:id
 * Get a single product by ID
 */
app.get('/api/products/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        error: 'Product not found' 
      });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CATEGORIES ENDPOINT ============

/**
 * GET /api/categories
 * Get all available product categories
 */
app.get('/api/categories', (req, res) => {
  try {
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ORDERS ENDPOINT ============

/**
 * POST /api/orders
 * Create a new order
 * Body: { items: Array, total: number, customerEmail: string }
 */
app.post('/api/orders', (req, res) => {
  try {
    const { items, total, customerEmail } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid items array' 
      });
    }
    
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email address' 
      });
    }
    
    const order = createOrder({
      items,
      total,
      customerEmail,
      status: 'pending'
    });
    
    res.status(201).json({ 
      success: true, 
      data: order,
      message: 'Order created successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ HEALTH CHECK ============

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    status: 'API is running',
    timestamp: new Date().toISOString(),
    productsCount: products.length,
    categoriesCount: categories.length
  });
});

// ============ 404 HANDLER ============

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found',
    path: req.path
  });
});

// ============ ERROR HANDLER ============

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    message: err.message
  });
});

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║    E-commerce API Server           ║
╠════════════════════════════════════╣
║  Server running on port ${PORT}        ║
║  http://localhost:${PORT}              ║
║                                    ║
║  Available endpoints:              ║
║  GET  /api/health                  ║
║  GET  /api/products                ║
║  GET  /api/products/:id            ║
║  GET  /api/categories              ║
║  POST /api/orders                  ║
╚════════════════════════════════════╝
  `);
});
