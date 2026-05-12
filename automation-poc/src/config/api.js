// API Configuration
// This file defines the base URL for API calls

// Development: Local API server
// export const API_BASE_URL = 'http://localhost:5000'

// Production: Remote API server (GitHub Pages deployment)
// Adjust this based on your deployment strategy
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  ORDERS: '/api/orders',
  HEALTH: '/api/health'
}

// Helper function to build full API URLs
export function getApiUrl(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key])
    }
  })
  return url.toString()
}

// Fetch helper with error handling
export async function apiCall(endpoint, options = {}) {
  const url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `API Error: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API Call Error:', error)
    throw error
  }
}
