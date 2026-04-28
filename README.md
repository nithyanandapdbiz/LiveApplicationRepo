# Shoply — E-commerce POC

A simple multi-page React e-commerce application built as a proof of concept. Demonstrates routing, global state, API integration, and end-to-end automation (CI/CD via GitHub Actions to GitHub Pages).

The intent is **not** to ship a real store — it's a working demo of a SPA with realistic e-commerce flows.

---

## Pages

1. **Home** (`/`) — Hero section with featured products fetched from the API
2. **Products** (`/products`) — Full catalog with category filtering
3. **Product Details** (`/products/:id`) — Single product view with quantity selector + add to cart
4. **Cart** (`/cart`) — Shopping cart with quantity adjustments and order summary
5. **Contact** (`/contact`) — Contact form with company info

Plus a 404 page for unmatched routes.

---

## Stack

- **React 18** with React Router v6
- **Vite** for dev server + build
- **React Context** for cart state management
- **FakeStore API** ([fakestoreapi.com](https://fakestoreapi.com)) for product data
- **Plain CSS** — fonts via Google Fonts (Playfair Display + Inter)

No backend, no database, no auth. Pure client-side SPA.

---

## Project Structure

```
ecommerce-poc/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI: build + deploy to GitHub Pages
├── index.html                      # Vite entry
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                    # React + router + cart provider
    ├── App.jsx                     # Routes
    ├── styles.css                  # All styles
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   └── ProductCard.jsx
    ├── context/
    │   └── CartContext.jsx         # Global cart state
    └── pages/
        ├── Home.jsx
        ├── Products.jsx
        ├── ProductDetails.jsx
        ├── Cart.jsx
        ├── Contact.jsx
        └── NotFound.jsx
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# install dependencies
npm install

# start dev server (opens http://localhost:3000)
npm run dev

# create production build (output: ./dist)
npm run build

# preview production build locally
npm run preview
```

---

## CI / CD Pipeline

GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Triggers on every push to `main` (also runnable manually)
2. Installs dependencies with `npm install`
3. Builds the production bundle (`npm run build`) with the correct base path for GitHub Pages
4. Adds a `404.html` fallback (required for SPA routing on Pages)
5. Deploys the `dist/` folder to GitHub Pages

### One-time setup on GitHub

1. Go to **Settings → Pages**
2. Under **Build and deployment → Source**, select **GitHub Actions**
3. Push to `main` — site deploys to:

```
https://<your-username>.github.io/<repo-name>/
```

---

## Key Implementation Details

### Cart state
Managed via `CartContext` — provides `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, and computed `totalItems` / `totalPrice`. State is in-memory only (resets on page refresh).

### SPA routing on GitHub Pages
GitHub Pages serves static files only and doesn't know about client-side routes. When a user refreshes `/products/5`, Pages returns 404. The workflow copies `index.html` → `404.html`, so any 404 falls back to the React app, which then renders the correct route.

### Base path handling
`vite.config.js` reads `VITE_BASE_PATH` from the environment. The CI sets this to `/<repo-name>/` so all asset paths and `BrowserRouter` routes resolve correctly under the Pages subpath. Local dev still uses `/`.

---

## What This POC Demonstrates

- Multi-page SPA with React Router
- Global state management without Redux (Context API only)
- External API integration with loading and error states
- Responsive layout (4 → 3 → 2 → 1 column grids)
- End-to-end automation: `git push` → live URL with no manual steps

---

## License

Internal POC — no license attached. Adjust as appropriate.
