# E-commerce API

A simple Express.js API server for the e-commerce POC.

## Features

- ✅ Product listing with category filtering
- ✅ Single product details
- ✅ Categories endpoint
- ✅ Order management
- ✅ CORS enabled
- ✅ Health check endpoint
- ✅ Docker support

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Production

```bash
npm start
```

## API Endpoints

### GET /api/health
Health check endpoint
```bash
curl http://localhost:5000/api/health
```

### GET /api/products
Get all products with optional filtering
```bash
# Get all products
curl http://localhost:5000/api/products

# Get products with limit and skip (pagination)
curl "http://localhost:5000/api/products?limit=10&skip=0"

# Get products by category
curl "http://localhost:5000/api/products?category=electronics"
```

### GET /api/products/:id
Get a single product
```bash
curl http://localhost:5000/api/products/1
```

### GET /api/categories
Get all available categories
```bash
curl http://localhost:5000/api/categories
```

### POST /api/orders
Create a new order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"id": 1, "quantity": 2}],
    "total": 259.98,
    "customerEmail": "customer@example.com"
  }'
```

## Docker

### Build Image
```bash
docker build -t ecommerce-api .
```

### Run Container
```bash
docker run -p 5000:5000 ecommerce-api
```

### Docker Compose
```bash
docker-compose up
```

## Response Format

All endpoints return a standard JSON format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Database

Currently uses in-memory mock data. For production, integrate a real database (MongoDB, PostgreSQL, etc.)

## License

Internal POC - No license
