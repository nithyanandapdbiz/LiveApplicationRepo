// Mock product database
// Images: curated Unsplash photos, each matched to the product.
// URL format: images.unsplash.com/photo-{ID}?w=300&h=300&fit=crop&auto=format&q=80

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=300&h=300&fit=crop&auto=format&q=80`;

export const products = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 129.99,
    discount: 15,
    description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
    category: "electronics",
    image: img("1505740420928-5e560c06d30e"),
    rating: { rate: 4.8, count: 542 },
    stock: 23
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable, breathable organic cotton t-shirt available in multiple colors. Perfect for casual wear.",
    category: "clothing",
    image: img("1521572163474-6864f9cf17ab"),
    rating: { rate: 4.5, count: 289 },
    stock: 150
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    price: 34.99,
    discount: 10,
    description: "Double-walled insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. 1L capacity.",
    category: "accessories",
    image: img("1602143407151-7111542de6e8"),
    rating: { rate: 4.6, count: 1205 },
    stock: 87
  },
  {
    id: 4,
    title: "Laptop Stand - Adjustable",
    price: 49.99,
    description: "Ergonomic aluminum laptop stand with adjustable height and angle. Compatible with all laptops.",
    category: "electronics",
    image: img("1527864550417-7fd91fc51a46"),
    rating: { rate: 4.7, count: 876 },
    stock: 45
  },
  {
    id: 5,
    title: "Bamboo Sunglasses",
    price: 89.99,
    description: "UV protection sunglasses with eco-friendly bamboo frames. Includes case and cleaning cloth.",
    category: "accessories",
    image: img("1572635196237-14b3f281503f"),
    rating: { rate: 4.4, count: 445 },
    stock: 62
  },
  {
    id: 6,
    title: "Slim Fit Jeans",
    price: 59.99,
    description: "Classic blue slim fit jeans made from premium denim. Comfortable and durable.",
    category: "clothing",
    image: img("1542272604-787c3835535d"),
    rating: { rate: 4.3, count: 678 },
    stock: 200
  },
  {
    id: 7,
    title: "4K USB-C Hub",
    price: 79.99,
    description: "Multi-port USB-C hub with 4K HDMI, USB 3.0, SD card reader, and USB-C PD charging.",
    category: "electronics",
    image: img("1629654297299-c8506221ca97"),
    rating: { rate: 4.6, count: 523 },
    stock: 38
  },
  {
    id: 8,
    title: "Leather Phone Case",
    price: 24.99,
    description: "Premium leather phone case with card slots. Provides excellent protection and style.",
    category: "accessories",
    image: img("1601784551446-20c9e07cdbdb"),
    rating: { rate: 4.5, count: 892 },
    stock: 110
  },
  {
    id: 9,
    title: "Wool Sweater",
    price: 79.99,
    description: "Cozy wool sweater perfect for cold weather. Machine washable and available in multiple sizes.",
    category: "clothing",
    image: img("1434389677669-e08b4cac3105"),
    rating: { rate: 4.7, count: 334 },
    stock: 75
  },
  {
    id: 10,
    title: "Mechanical Keyboard",
    price: 149.99,
    description: "Premium mechanical gaming keyboard with RGB backlighting and customizable switches.",
    category: "electronics",
    image: img("1587829741301-dc798b83add3"),
    rating: { rate: 4.8, count: 1456 },
    stock: 30
  },
  {
    id: 11,
    title: "Minimalist Backpack",
    price: 89.99,
    description: "Sleek 25L backpack with waterproof material and ergonomic design for daily use.",
    category: "accessories",
    image: img("1553062407-98eeb64c6a62"),
    rating: { rate: 4.6, count: 567 },
    stock: 54
  },
  {
    id: 12,
    title: "Linen Dress",
    price: 69.99,
    description: "Lightweight linen dress perfect for summer. Breathable, comfortable, and stylish.",
    category: "clothing",
    image: img("1568252542512-9fe8fe9c87bb"),
    rating: { rate: 4.4, count: 289 },
    stock: 90
  },
  {
    id: 13,
    title: "Smart Watch",
    price: 199.99,
    description: "Feature-packed smart watch with heart rate monitor, GPS, sleep tracking, and 7-day battery life.",
    category: "electronics",
    image: img("1523275335684-37898b6baf30"),
    rating: { rate: 4.7, count: 983 },
    stock: 41
  },
  {
    id: 14,
    title: "Yoga Mat",
    price: 44.99,
    description: "Non-slip, eco-friendly yoga mat with alignment lines. 6mm thick for joint support. Includes carry strap.",
    category: "accessories",
    image: img("1544367567-0f2fcb009e0b"),
    rating: { rate: 4.5, count: 712 },
    stock: 130
  },
  {
    id: 15,
    title: "Pour-Over Coffee Maker",
    price: 39.99,
    description: "Elegant glass pour-over coffee maker with reusable stainless steel filter. Brews up to 600ml.",
    category: "home & kitchen",
    image: img("1495474472287-4d71bcdd2085"),
    rating: { rate: 4.6, count: 421 },
    stock: 66
  },
  {
    id: 16,
    title: "LED Desk Lamp",
    price: 54.99,
    description: "Adjustable LED desk lamp with 5 color temperatures, USB charging port, and touch dimmer. Eye-care certified.",
    category: "home & kitchen",
    image: img("1518455027359-f3f8164ba6bd"),
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
