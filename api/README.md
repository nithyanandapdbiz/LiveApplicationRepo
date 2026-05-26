# E-commerce API

Express.js REST API for the e-commerce POC.

## Features

- Product listing with search, sort, price range, stock, category, and pagination
- Single product details
- Categories endpoint
- Full order lifecycle: create, retrieve, update status, delete
- Rate limiting (100 req/IP/min)
- Security headers (CORS restricted, X-Content-Type-Options, X-Frame-Options, etc.)
- OpenTelemetry tracing
- Structured request logging with status code and response time
- Docker support

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

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `NODE_ENV` | `development` | Environment name |
| `ALLOWED_ORIGINS` | _(empty)_ | Comma-separated extra CORS origins |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4317` | OpenTelemetry collector endpoint |

## API Endpoints

### GET /api/health

Returns server status, uptime, memory usage, and data stats.

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "status": "API is running",
  "timestamp": "2026-05-26T...",
  "environment": "development",
  "uptime": 42,
  "stats": { "products": 16, "categories": 4, "orders": 3 },
  "memory": { "heapUsed": "12MB", "heapTotal": "28MB" }
}
```

---

### GET /api/products

Returns a list of products. All query params are optional and combinable.

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter by category |
| `search` | string | Search title and description (max 100 chars) |
| `sort` | `price` \| `rating` \| `title` | Sort field |
| `order` | `asc` \| `desc` | Sort direction (default: `asc`) |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |
| `inStock` | `true` | Only return products with stock > 0 |
| `limit` | number | Page size (default: 20) |
| `skip` | number | Records to skip (default: 0) |

```bash
# All products
curl http://localhost:5000/api/products

# Search + sort
curl "http://localhost:5000/api/products?search=keyboard&sort=price&order=asc"

# Price range, in-stock only
curl "http://localhost:5000/api/products?minPrice=30&maxPrice=100&inStock=true"

# Category + pagination
curl "http://localhost:5000/api/products?category=electronics&limit=5&skip=0"
```

**Response:**
```json
{
  "success": true,
  "data": [{ "id": 1, "title": "...", "price": 129.99, "stock": 23, ... }],
  "total": 4,
  "pagination": {
    "page": 1,
    "pages": 1,
    "limit": 20,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

### GET /api/products/:id

```bash
curl http://localhost:5000/api/products/1
```

---

### GET /api/categories

```bash
curl http://localhost:5000/api/categories
```

**Response:** `{ "success": true, "data": ["electronics", "clothing", "accessories", "home & kitchen"] }`

---

### POST /api/orders

Create a new order.

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"id": 1, "quantity": 2}],
    "total": 259.98,
    "customerEmail": "customer@example.com"
  }'
```

**Validations:** `items` must be a non-empty array; `customerEmail` must be valid; `total` must be a positive number.

**Response:** `201 Created` with `{ "success": true, "data": { "id": "...", "status": "pending", ... } }`

---

### GET /api/orders

List all orders. Optionally filter by status or email.

```bash
# All orders
curl http://localhost:5000/api/orders

# Filter by status
curl "http://localhost:5000/api/orders?status=shipped"

# Filter by customer email
curl "http://localhost:5000/api/orders?email=customer@example.com"
```

---

### GET /api/orders/:id

```bash
curl http://localhost:5000/api/orders/1779758746889
```

---

### PATCH /api/orders/:id

Update order status. Valid values: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`.

```bash
curl -X PATCH http://localhost:5000/api/orders/1779758746889 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

**Response:** Updated order with `updatedAt` timestamp.

---

### DELETE /api/orders/:id

Remove an order permanently.

```bash
curl -X DELETE http://localhost:5000/api/orders/1779758746889
```

**Response:** `{ "success": true, "data": { ...deletedOrder }, "message": "Order deleted successfully" }`

---

## Response Format

All endpoints return a standard JSON envelope:

```json
{ "success": true, "data": { } }
{ "success": false, "error": "Error message" }
```

## Rate Limiting

100 requests per IP per minute. Exceeding this returns `429 Too Many Requests`.

## Docker

```bash
# Build and run
docker build -t ecommerce-api .
docker run -p 5000:5000 ecommerce-api

# With Docker Compose (API + frontend)
docker-compose up
```

## Notes

- Orders are stored in-memory and reset on server restart.
- For production, replace the in-memory store in `data.js` with a real database (MongoDB, PostgreSQL, etc.).
