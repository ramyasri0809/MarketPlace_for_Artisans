import { Product, PaymentMethod, UpiApp } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Handwoven Kashmiri Pashmina Shawl",
    artisan: "Rajesh Kumar",
    location: "Srinagar, Kashmir",
    price: 4500,
    originalPrice: 6000,
    category: "Textiles",
    image: "https://images.unsplash.com/photo-1755991699077-91534a9828cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGUlMjB3ZWF2aW5nfGVufDF8fHx8MTc1ODM4MTY1MHww&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.8,
    reviews: 127,
    description: "Authentic Kashmiri pashmina made from finest goat wool, hand-spun and woven by master craftsmen.",
    inStock: true,
    artisanId: 1
  },
  {
    id: 2,
    name: "Blue Pottery Decorative Vase",
    artisan: "Meera Sharma",
    location: "Jaipur, Rajasthan",
    price: 850,
    originalPrice: 1200,
    category: "Pottery",
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmFkaXRpb25hbCUyMGNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU4MzgxNjQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.6,
    reviews: 83,
    description: "Traditional blue pottery vase with intricate floral patterns, perfect for home decoration.",
    inStock: true,
    artisanId: 2
  },
  {
    id: 3,
    name: "Sandalwood Carved Elephant",
    artisan: "Ravi Krishnan",
    location: "Mysore, Karnataka",
    price: 1250,
    originalPrice: 1500,
    category: "Wood Crafts",
    image: "https://images.unsplash.com/photo-1738508117775-883afd3d99da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBoYW5kaWNyYWZ0cyUyMGNhcnZpbmd8ZW58MXx8fHwxNzU4MzA0NjA2fDA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.9,
    reviews: 156,
    description: "Intricately carved sandalwood elephant sculpture, representing wisdom and prosperity.",
    inStock: true,
    artisanId: 3
  },
  {
    id: 4,
    name: "Kundan Gold Plated Necklace",
    artisan: "Priya Agarwal",
    location: "Jaipur, Rajasthan",
    price: 2800,
    originalPrice: 3500,
    category: "Jewelry",
    image: "https://images.unsplash.com/photo-1655111379423-b85edc4da9ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwbWFraW5nJTIwYXJ0aXNhbnxlbnwxfHx8fDE3NTgzNDk4MjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.7,
    reviews: 92,
    description: "Traditional Kundan jewelry with gold plating and semi-precious stones.",
    inStock: true,
    artisanId: 4
  },
  {
    id: 5,
    name: "Madhubani Painted Wall Art",
    artisan: "Sunita Devi",
    location: "Mithila, Bihar",
    price: 650,
    originalPrice: 900,
    category: "Paintings",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGluZyUyMGFydCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODM4MTY1MXww&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.5,
    reviews: 67,
    description: "Traditional Madhubani painting depicting folk tales and natural themes.",
    inStock: true,
    artisanId: 5
  },
  {
    id: 6,
    name: "Brass Dhokra Horse Figurine",
    artisan: "Ganesh Bastar",
    location: "Bastar, Chhattisgarh",
    price: 450,
    originalPrice: 600,
    category: "Metal Crafts",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGFydCUyMGhvcnNlfGVufDF8fHx8MTc1ODM4MTY1MXww&ixlib=rb-4.1.0&q=80&w=400",
    rating: 4.4,
    reviews: 45,
    description: "Ancient Dhokra art technique brass figurine with tribal motifs.",
    inStock: false,
    artisanId: 6
  }
];

export const categories = [
  "All Categories",
  "Textiles",
  "Pottery", 
  "Wood Crafts",
  "Jewelry",
  "Paintings",
  "Metal Crafts",
  "Leather Goods",
  "Stone Crafts"
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'upi', name: 'UPI Payment', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💰' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Digital Wallet', icon: '👛' }
];

export const upiApps: UpiApp[] = [
  { id: 'phonepe', name: 'PhonePe', icon: '📱', color: 'bg-purple-600' },
  { id: 'googlepay', name: 'Google Pay', icon: '🔍', color: 'bg-blue-600' },
  { id: 'paytm', name: 'Paytm', icon: '💙', color: 'bg-blue-500' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: '🛒', color: 'bg-orange-500' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳', color: 'bg-green-600' },
  { id: 'other', name: 'Other UPI App', icon: '📲', color: 'bg-gray-600' }
];