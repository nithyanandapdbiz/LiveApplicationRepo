# API Integration Guide

This guide explains how the e-commerce POC has been enhanced with a custom API backend for better control, validation, and testing.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                    │
│  - Home, Products, ProductDetails, Cart, Contact       │
│  - Uses custom API endpoints                           │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ├── API Calls
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API (Express.js)                   │
│  - /api/products (GET)                                 │
│  - /api/products/:id (GET)                             │
│  - /api/categories (GET)                               │
│  - /api/orders (POST)                                  │
│  - /api/health (GET)                                   │
└─────────────────────────────────────────────────────────┘
```

## Key Changes

### 1. **Frontend - API Configuration**

File: `automation-poc/src/config/api.js`

Centralized API configuration with:
- Base URL management (development vs production)
- Endpoint constants
- Helper functions for API calls

```javascript
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

// Example usage
const url = `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}`
```

### 2. **Frontend - Updated Components**

Modified to use custom API:

- **Home.jsx** - Fetches featured products (4 items)
- **Products.jsx** - Fetches all products with category filtering
- **ProductDetails.jsx** - Fetches single product details
- **Cart.jsx** - Can submit orders via POST /api/orders

### 3. **Backend - Express Server**

File: `api/server.js`

Features:
- CORS enabled for cross-origin requests
- Error handling and validation
- Standard JSON response format
- Request logging

### 4. **Backend - Mock Data**

File: `api/data.js`

Includes:
- 12 sample products across 3 categories
- Category management
- Order storage (in-memory)

## Running the Solution

### Option 1: Local Development

**Terminal 1 - Start API Server:**
```bash
cd api
npm install
npm run dev
```
API runs on http://localhost:5000

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd automation-poc
npm install
npm run dev
```
Frontend runs on http://localhost:3000

**Terminal 3 (Optional) - Verify API:**
```bash
curl http://localhost:5000/api/health
```

### Option 2: Docker Compose

```bash
docker-compose up
```

Starts both services:
- API: http://localhost:5000
- Frontend: http://localhost:3000

### Option 3: Individual Docker Containers

**Build API:**
```bash
docker build -t ecommerce-api ./api
docker run -p 5000:5000 ecommerce-api
```

**Build Frontend:**
```bash
docker build -t ecommerce-web ./automation-poc
docker run -p 3000:3000 -e VITE_API_URL=http://localhost:5000 ecommerce-web
```

## Environment Configuration

### Development (.env.local)
```
VITE_API_URL=http://localhost:5000
```

### Production (.env.production)
```
VITE_API_URL=https://api.yourdomain.com
```

The frontend reads `VITE_API_URL` from these files.

## API Endpoints Reference

### GET /api/health
Health check and stats
```bash
curl http://localhost:5000/api/health
```
**Response:**
```json
{
  "success": true,
  "status": "API is running",
  "productsCount": 12,
  "categoriesCount": 3
}
```

### GET /api/products
Get all products with optional filters
```bash
# All products
curl http://localhost:5000/api/products

# With filters
curl "http://localhost:5000/api/products?category=electronics&limit=5"
```
**Response:**
```json
{
  "success": true,
  "data": [{ id, title, price, category, rating, ... }],
  "total": 12
}
```

### GET /api/products/:id
Get single product
```bash
curl http://localhost:5000/api/products/1
```
**Response:**
```json
{
  "success": true,
  "data": { id, title, price, ... }
}
```

### GET /api/categories
Get all categories
```bash
curl http://localhost:5000/api/categories
```
**Response:**
```json
{
  "success": true,
  "data": ["electronics", "clothing", "accessories"]
}
```

### POST /api/orders
Create an order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"id": 1, "quantity": 2}],
    "total": 259.98,
    "customerEmail": "customer@example.com"
  }'
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1715502600000",
    "items": [...],
    "total": 259.98,
    "customerEmail": "customer@example.com",
    "status": "pending",
    "createdAt": "2026-05-12T..."
  }
}
```

## Testing Workflows

### 1. Test Product Listing
1. Start API server
2. Navigate to http://localhost:3000/products
3. Verify products load
4. Test category filters
5. Check browser console for API calls

### 2. Test Product Details
1. Click on any product
2. Verify single product details load
3. Check product rating displays
4. Test quantity selector

### 3. Test Cart Operations
1. Add items to cart
2. Go to /cart page
3. Modify quantities
4. Verify cart total updates
5. (Optional) Submit order

### 4. Test Error Scenarios
1. Stop API server
2. Try to load products
3. Verify error message appears
4. Restart API
5. Verify page recovers

## Data Flow Example

### Products Page Load
```
1. User navigates to /products
2. Products.jsx useEffect triggers
3. Sends: GET /api/products
4. Receives: { success: true, data: [...], total: 12 }
5. Component updates state with product data
6. Also requests: GET /api/categories
7. Receives: { success: true, data: ["electronics", "clothing", "accessories"] }
8. Category buttons render
9. Products display in grid
```

### Add to Cart & Order
```
1. User clicks "Add to Cart"
2. CartContext updates local state
3. User navigates to /cart
4. Views cart items from context
5. Enters email and clicks "Place Order"
6. Cart.jsx sends: POST /api/orders
7. Body: { items, total, customerEmail }
8. Receives: { success: true, data: { id, ... } }
9. Order confirmation displayed
10. Cart cleared
```

## Comparison: FakeStore vs Custom API

| Aspect | FakeStore | Custom API |
|--------|-----------|-----------|
| Control | Limited | Full |
| Data | Fixed/Generic | Customizable |
| Schema | Fixed | Flexible |
| Offline Support | No | Yes (mock data) |
| Response Format | Varies | Standardized |
| Order API | No | Yes |
| Custom Fields | Not possible | Easy to add |
| Database | External | Local/Any |

## Adding to the API

### Add New Endpoint
File: `api/server.js`
```javascript
app.get('/api/new-endpoint', (req, res) => {
  try {
    // Handle request
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Update Frontend to Use New Endpoint
File: `automation-poc/src/config/api.js`
```javascript
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_ENDPOINT: '/api/new-endpoint'
}
```

File: `automation-poc/src/pages/SomePage.jsx`
```javascript
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.NEW_ENDPOINT}`)
```

## Deployment

### Deploy API to Heroku
```bash
cd api
heroku create your-app-name
git push heroku main
```

### Deploy Frontend to GitHub Pages
1. Update `.env.production` with API URL
2. Push to main branch
3. CI/CD automatically deploys

### Deploy with Docker Compose
```bash
docker-compose up -d
```

## Monitoring & Debugging

### API Logs
The API logs all requests:
```
[2026-05-12T10:30:00.000Z] GET /api/products
[2026-05-12T10:30:01.000Z] GET /api/categories
[2026-05-12T10:30:02.000Z] POST /api/orders
```

### Browser DevTools
1. Open F12
2. Network tab shows all API calls
3. Check Response/Preview tabs for data
4. Console shows any errors

### Curl Testing
```bash
# Test endpoint manually
curl -v http://localhost:5000/api/products

# See request/response details
curl -i http://localhost:5000/api/products
```

## Next Improvements

1. **Database Integration**
   - Replace mock data with MongoDB/PostgreSQL
   - Add persistence

2. **Authentication**
   - User registration/login
   - JWT tokens
   - Secure endpoints

3. **Advanced Features**
   - Search functionality
   - Sorting/filtering
   - Reviews/ratings
   - Wishlist

4. **Performance**
   - Caching
   - Rate limiting
   - Compression

5. **Testing**
   - Unit tests
   - Integration tests
   - Load testing

---

**For detailed API testing instructions, see [API-TESTING.md](../API-TESTING.md)**
