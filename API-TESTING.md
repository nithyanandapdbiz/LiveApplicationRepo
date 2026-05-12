# API Testing Guide

This document provides instructions for testing the e-commerce API integration.

## Prerequisites

- Node.js 18+
- npm or yarn
- curl or Postman (for manual API testing)

## Running the API Server

### Local Development

```bash
cd api
npm install
npm run dev
```

The API will start on `http://localhost:5000`

### Using Docker

```bash
docker build -t ecommerce-api ./api
docker run -p 5000:5000 ecommerce-api
```

### Using Docker Compose (Full Stack)

```bash
docker-compose up
```

This starts both the API and frontend.

## Testing Endpoints

### 1. Health Check

```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "status": "API is running",
  "timestamp": "2026-05-12T10:30:00.000Z",
  "productsCount": 12,
  "categoriesCount": 3
}
```

### 2. Get All Products

```bash
curl http://localhost:5000/api/products
```

**Query Parameters:**
- `limit`: Number of products (default: 20)
- `skip`: Offset (default: 0)
- `category`: Filter by category

**Example with filters:**
```bash
curl "http://localhost:5000/api/products?limit=5&skip=0&category=electronics"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Premium Wireless Headphones",
      "price": 129.99,
      "description": "...",
      "category": "electronics",
      "image": "...",
      "rating": { "rate": 4.8, "count": 542 }
    }
  ],
  "total": 12
}
```

### 3. Get Single Product

```bash
curl http://localhost:5000/api/products/1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Premium Wireless Headphones",
    "price": 129.99,
    ...
  }
}
```

### 4. Get Categories

```bash
curl http://localhost:5000/api/categories
```

**Expected Response:**
```json
{
  "success": true,
  "data": ["electronics", "clothing", "accessories"]
}
```

### 5. Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"id": 1, "title": "Headphones", "quantity": 1, "price": 129.99}
    ],
    "total": 129.99,
    "customerEmail": "customer@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "1715502600000",
    "items": [...],
    "total": 129.99,
    "customerEmail": "customer@example.com",
    "status": "pending",
    "createdAt": "2026-05-12T10:30:00.000Z"
  },
  "message": "Order created successfully"
}
```

## Validation Scenarios

### Scenario 1: Successful Product Listing
1. Start API server
2. Navigate to http://localhost:3000/products
3. **Expected:** Products load from custom API
4. Filters work correctly by category

### Scenario 2: Single Product Details
1. Click on any product
2. Navigate to `/products/[id]`
3. **Expected:** Product details load from custom API
4. Add to cart functionality works

### Scenario 3: Cart Order Creation
1. Add items to cart
2. Go to Cart page
3. Proceed to checkout
4. Submit order with valid email
5. **Expected:** Order is created via API with success response

### Scenario 4: Error Handling
1. Stop the API server
2. Try to load products page
3. **Expected:** Error message displayed
4. Retry functionality available

### Scenario 5: API Fallback Configuration
1. Update `VITE_API_URL` in `.env.local` to a different API URL
2. Restart dev server
3. **Expected:** Frontend uses the new API URL

## Performance Testing

### Load Testing with Apache Bench

```bash
# Test products endpoint
ab -n 1000 -c 10 http://localhost:5000/api/products

# Test product details
ab -n 1000 -c 10 http://localhost:5000/api/products/1
```

### Latency Check

```bash
# Time a single request
time curl http://localhost:5000/api/products
```

## Debugging

### Enable API Logs
The API logs all requests to stdout:
```
[2026-05-12T10:30:00.000Z] GET /api/products
[2026-05-12T10:30:01.000Z] GET /api/categories
```

### Check Frontend Network Requests
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Verify API calls to the correct endpoint

### Common Issues

**Issue:** "API not responding"
- **Solution:** Ensure API is running and accessible at `VITE_API_URL`

**Issue:** CORS errors
- **Solution:** API has CORS enabled. Check browser console for details.

**Issue:** Products not showing
- **Solution:** Check API health: `curl http://localhost:5000/api/health`

## Integration Checklist

- [ ] API server starts without errors
- [ ] Health check endpoint responds
- [ ] Products list displays in frontend
- [ ] Categories filter works
- [ ] Single product details load
- [ ] Add to cart functions
- [ ] Order creation works
- [ ] Error handling displays properly
- [ ] No CORS errors in console
- [ ] API logs show all requests

## Next Steps

1. **Database Integration:** Replace mock data with MongoDB/PostgreSQL
2. **Authentication:** Add user registration/login
3. **Payment Integration:** Add Stripe/PayPal
4. **Email Notifications:** Send order confirmations
5. **Admin Dashboard:** Add order management interface

---

For more information, see the main [README.md](../README.md) and [API README](../api/README.md).
