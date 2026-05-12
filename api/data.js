// Mock product database
export const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=Headphones",
    rating: { rate: 4.8, count: 542 }
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable, breathable organic cotton t-shirt available in multiple colors. Perfect for casual wear.",
    category: "clothing",
    image: "https://via.placeholder.com/300x300?text=T-Shirt",
    rating: { rate: 4.5, count: 289 }
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. 1L capacity.",
    category: "accessories",
    image: "https://via.placeholder.com/300x300?text=Water+Bottle",
    rating: { rate: 4.6, count: 1205 }
  },
  {
    id: 4,
    title: "Laptop Stand - Adjustable",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height and angle. Compatible with all laptops.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=Laptop+Stand",
    rating: { rate: 4.7, count: 876 }
  },
  {
    id: 5,
    title: "Bamboo Sunglasses",
    price: 89.99,
    description: "UV protection sunglasses with eco-friendly bamboo frames. Includes case and cleaning cloth.",
    category: "accessories",
    image: "https://via.placeholder.com/300x300?text=Sunglasses",
    rating: { rate: 4.4, count: 445 }
  },
  {
    id: 6,
    title: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic blue slim fit jeans made from premium denim. Comfortable and durable.",
    category: "clothing",
    image: "https://via.placeholder.com/300x300?text=Jeans",
    rating: { rate: 4.3, count: 678 }
  },
  {
    id: 7,
    title: "4K USB-C Hub",
    price: 79.99,
    description: "Multi-port USB-C hub with 4K HDMI, USB 3.0, SD card reader, and USB-C PD charging.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=USB+Hub",
    rating: { rate: 4.6, count: 523 }
  },
  {
    id: 8,
    title: "Leather Phone Case",
    price: 24.99,
    description: "Premium leather phone case with card slots. Provides excellent protection and style.",
    category: "accessories",
    image: "https://via.placeholder.com/300x300?text=Phone+Case",
    rating: { rate: 4.5, count: 892 }
  },
  {
    id: 9,
    title: "Wool Sweater",
    price: 79.99,
    description: "Cozy wool sweater perfect for cold weather. Machine washable and available in multiple sizes.",
    category: "clothing",
    image: "https://via.placeholder.com/300x300?text=Sweater",
    rating: { rate: 4.7, count: 334 }
  },
  {
    id: 10,
    title: "Mechanical Keyboard",
    price: 149.99,
    description: "Premium mechanical gaming keyboard with RGB backlighting and customizable switches.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=Keyboard",
    rating: { rate: 4.8, count: 1456 }
  },
  {
    id: 11,
    title: "Minimalist Backpack",
    price: 89.99,
    description: "Sleek 25L backpack with waterproof material and ergonomic design for daily use.",
    category: "accessories",
    image: "https://via.placeholder.com/300x300?text=Backpack",
    rating: { rate: 4.6, count: 567 }
  },
  {
    id: 12,
    title: "Linen Dress",
    price: 69.99,
    description: "Lightweight linen dress perfect for summer. Breathable, comfortable, and stylish.",
    category: "clothing",
    image: "https://via.placeholder.com/300x300?text=Dress",
    rating: { rate: 4.4, count: 289 }
  }
];

export const categories = ["electronics", "clothing", "accessories"];

// In-memory orders storage (resets on server restart)
export let orders = [];

export function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category);
}

export function createOrder(orderData) {
  const order = {
    id: Date.now().toString(),
    ...orderData,
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  return order;
}
