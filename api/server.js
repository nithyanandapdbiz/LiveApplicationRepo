import './tracing.js';
import express from 'express';
import cors from 'cors';
import {
  products,
  categories,
  getProductById,
  getProductsByCategory,
  createOrder,
  getOrderById,
  updateOrderStatus,
  orders
} from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security hardening (pentest ENG-SR-MP3EFVCH) ─────────────────────────────
// Remove Express server-version disclosure (FIND-MP3EFVX3-H21AX)
app.disable('x-powered-by');

// Restrict CORS to known front-end origins (FIND-MP3EFVZA-J28A0)
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: [
    'https://nithyanandapdbiz.github.io',
    'http://localhost:3000',
    'http://localhost:5173',
    ...ALLOWED_ORIGINS,
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Security response headers (FIND-MP3EFVX1-T7P59, FIND-MP3EFVX1-KTB10,
// FIND-MP3EFVX1-Z9OIH, FIND-MP3EFVX1-U12H5)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Rate limiting — 100 requests per IP per minute
const rateLimitMap = new Map();
const RATE_LIMIT = 100;
const RATE_WINDOW_MS = 60 * 1000;

app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return next();
  }

  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({ success: false, error: 'Too many requests, please try again later.' });
  }

  entry.count++;
  next();
});

// Middleware
app.use(express.json({ limit: '10kb' }));

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
    const { category, search, sort, order = 'asc', limit = 20, skip = 0 } = req.query;

    let result = category ? getProductsByCategory(category) : [...products];

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    if (sort) {
      const dir = order === 'desc' ? -1 : 1;
      result.sort((a, b) => {
        if (sort === 'price') return (a.price - b.price) * dir;
        if (sort === 'rating') return (a.rating.rate - b.rating.rate) * dir;
        if (sort === 'title') return a.title.localeCompare(b.title) * dir;
        return 0;
      });
    }

    const total = result.length;
    result = result.slice(parseInt(skip), parseInt(skip) + parseInt(limit));

    res.json({ success: true, data: result, total });
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

    if (total === undefined || typeof total !== 'number' || total <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid total: must be a positive number'
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

// ============ ORDER STATUS UPDATE ============

const VALID_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

/**
 * PATCH /api/orders/:id
 * Update order status
 * Body: { status: string }
 */
app.patch('/api/orders/:id', (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
      });
    }
    const order = updateOrderStatus(req.params.id, status);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ORDERS RETRIEVAL ============

/**
 * GET /api/orders
 * List all orders
 */
app.get('/api/orders', (req, res) => {
  try {
    res.json({ success: true, data: orders, total: orders.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/orders/:id
 * Get a single order by ID
 */
app.get('/api/orders/:id', (req, res) => {
  try {
    const order = getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
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
╔══════════════════════════════════════════╗
║       E-commerce API Server              ║
╠══════════════════════════════════════════╣
║  Server running on port ${PORT}              ║
║  http://localhost:${PORT}                    ║
║                                          ║
║  Available endpoints:                    ║
║  GET    /api/health                      ║
║  GET    /api/products                    ║
║  GET    /api/products?search=&sort=      ║
║  GET    /api/products/:id                ║
║  GET    /api/categories                  ║
║  POST   /api/orders                      ║
║  GET    /api/orders                      ║
║  GET    /api/orders/:id                  ║
║  PATCH  /api/orders/:id                  ║
╚══════════════════════════════════════════╝
  `);
});
