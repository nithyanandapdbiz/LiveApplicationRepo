// Mock product database
// Images use placehold.co with category colours so title always matches the image.
// Colour key: electronics=#0f172a  clothing=#4a1942  accessories=#1c3a4a  home&#38;kitchen=#3a2410

export const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
    category: "electronics",
    image: "https://placehold.co/300x300/0f172a/ffffff?text=Wireless%0AHeadphones",
    rating: { rate: 4.8, count: 542 },
    stock: 23
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable, breathable organic cotton t-shirt available in multiple colors. Perfect for casual wear.",
    category: "clothing",
    image: "https://placehold.co/300x300/4a1942/ffffff?text=Cotton%0AT-Shirt",
    rating: { rate: 4.5, count: 289 },
    stock: 150
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. 1L capacity.",
    category: "accessories",
    image: "https://placehold.co/300x300/1c3a4a/ffffff?text=Water%0ABottle",
    rating: { rate: 4.6, count: 1205 },
    stock: 87
  },
  {
    id: 4,
    title: "Laptop Stand - Adjustable",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height and angle. Compatible with all laptops.",
    category: "electronics",
    image: "https://placehold.co/300x300/0f172a/ffffff?text=Laptop%0AStand",
    rating: { rate: 4.7, count: 876 },
    stock: 45
  },
  {
    id: 5,
    title: "Bamboo Sunglasses",
    price: 89.99,
    description: "UV protection sunglasses with eco-friendly bamboo frames. Includes case and cleaning cloth.",
    category: "accessories",
    image: "https://placehold.co/300x300/1c3a4a/ffffff?text=Bamboo%0ASunglasses",
    rating: { rate: 4.4, count: 445 },
    stock: 62
  },
  {
    id: 6,
    title: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic blue slim fit jeans made from premium denim. Comfortable and durable.",
    category: "clothing",
    image: "https://placehold.co/300x300/4a1942/ffffff?text=Slim+Fit%0AJeans",
    rating: { rate: 4.3, count: 678 },
    stock: 200
  },
  {
    id: 7,
    title: "4K USB-C Hub",
    price: 79.99,
    description: "Multi-port USB-C hub with 4K HDMI, USB 3.0, SD card reader, and USB-C PD charging.",
    category: "electronics",
    image: "https://placehold.co/300x300/0f172a/ffffff?text=4K%0AUSB-C+Hub",
    rating: { rate: 4.6, count: 523 },
    stock: 38
  },
  {
    id: 8,
    title: "Leather Phone Case",
    price: 24.99,
    description: "Premium leather phone case with card slots. Provides excellent protection and style.",
    category: "accessories",
    image: "https://placehold.co/300x300/1c3a4a/ffffff?text=Leather%0APhone+Case",
    rating: { rate: 4.5, count: 892 },
    stock: 110
  },
  {
    id: 9,
    title: "Wool Sweater",
    price: 79.99,
    description: "Cozy wool sweater perfect for cold weather. Machine washable and available in multiple sizes.",
    category: "clothing",
    image: "https://placehold.co/300x300/4a1942/ffffff?text=Wool%0ASweater",
    rating: { rate: 4.7, count: 334 },
    stock: 75
  },
  {
    id: 10,
    title: "Mechanical Keyboard",
    price: 149.99,
    description: "Premium mechanical gaming keyboard with RGB backlighting and customizable switches.",
    category: "electronics",
    image: "https://placehold.co/300x300/0f172a/ffffff?text=Mechanical%0AKeyboard",
    rating: { rate: 4.8, count: 1456 },
    stock: 30
  },
  {
    id: 11,
    title: "Minimalist Backpack",
    price: 89.99,
    description: "Sleek 25L backpack with waterproof material and ergonomic design for daily use.",
    category: "accessories",
    image: "https://placehold.co/300x300/1c3a4a/ffffff?text=Minimalist%0ABackpack",
    rating: { rate: 4.6, count: 567 },
    stock: 54
  },
  {
    id: 12,
    title: "Linen Dress",
    price: 69.99,
    description: "Lightweight linen dress perfect for summer. Breathable, comfortable, and stylish.",
    category: "clothing",
    image: "https://placehold.co/300x300/4a1942/ffffff?text=Linen%0ADress",
    rating: { rate: 4.4, count: 289 },
    stock: 90
  },
  {
    id: 13,
    title: "Smart Watch",
    price: 199.99,
    description: "Feature-packed smart watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life.",
    category: "electronics",
    image: "https://placehold.co/300x300/0f172a/ffffff?text=Smart%0AWatch",
    rating: { rate: 4.7, count: 983 },
    stock: 41
  },
  {
    id: 14,
    title: "Yoga Mat",
    price: 44.99,
    description: "Non-slip, eco-friendly yoga mat with alignment lines. 6mm thick for joint support. Includes carry strap.",
    category: "accessories",
    image: "https://placehold.co/300x300/1c3a4a/ffffff?text=Yoga%0AMat",
    rating: { rate: 4.5, count: 712 },
    stock: 130
  },
  {
    id: 15,
    title: "Pour-Over Coffee Maker",
    price: 39.99,
    description: "Elegant glass pour-over coffee maker with reusable stainless steel filter. Brews up to 600ml.",
    category: "home & kitchen",
    image: "https://placehold.co/300x300/3a2410/ffffff?text=Coffee%0AMaker",
    rating: { rate: 4.6, count: 421 },
    stock: 66
  },
  {
    id: 16,
    title: "LED Desk Lamp",
    price: 54.99,
    description: "Adjustable LED desk lamp with 5 color temperatures, USB charging port, and touch dimmer. Eye-care certified.",
    category: "home & kitchen",
    image: "https://placehold.co/300x300/3a2410/ffffff?text=LED%0ADesk+Lamp",
    rating: { rate: 4.8, count: 634 },
    stock: 48
  }
];

export const categories = ["electronics", "clothing", "accessories", "home & kitchen"];

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

export function getOrderById(id) {
  return orders.find(o => o.id === id);
}

export function updateOrderStatus(id, status) {
  const order = orders.find(o => o.id === id);
  if (!order) return null;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
}

export function deleteOrder(id) {
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) return null;
  const [removed] = orders.splice(index, 1);
  return removed;
}
