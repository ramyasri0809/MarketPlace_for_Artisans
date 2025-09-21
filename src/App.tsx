import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, Filter, Star, MapPin, Plus, CreditCard, Truck, CheckCircle, Clock, Package, IndianRupee, Upload, X, LogIn, LogOut, UserPlus, Eye, EyeOff } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';
import { Textarea } from './components/ui/textarea';
import { Progress } from './components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Mock data for artisan products
const mockProducts = [
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

const categories = [
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

const paymentMethods = [
  { id: 'upi', name: 'UPI Payment', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💰' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Digital Wallet', icon: '👛' }
];

const upiApps = [
  { id: 'phonepe', name: 'PhonePe', icon: '📱', color: 'bg-purple-600' },
  { id: 'googlepay', name: 'Google Pay', icon: '🔍', color: 'bg-blue-600' },
  { id: 'paytm', name: 'Paytm', icon: '💙', color: 'bg-blue-500' },
  { id: 'amazonpay', name: 'Amazon Pay', icon: '🛒', color: 'bg-orange-500' },
  { id: 'bhim', name: 'BHIM UPI', icon: '🇮🇳', color: 'bg-green-600' },
  { id: 'other', name: 'Other UPI App', icon: '📲', color: 'bg-gray-600' }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  artisan: string;
}

interface Product {
  id: number;
  name: string;
  artisan: string;
  location: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  artisanId: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: string;
  address: string;
  orderDate: Date;
  estimatedDelivery: Date;
}

interface NewProduct {
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  location: string;
  image: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  userType: 'customer' | 'artisan';
  location?: string;
  joinDate: Date;
}

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'customer' | 'artisan';
  location: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('craftbazaar_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('craftbazaar_orders');
      return savedOrders ? JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        orderDate: new Date(order.orderDate),
        estimatedDelivery: new Date(order.estimatedDelivery)
      })) : [];
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    address: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [userType, setUserType] = useState<'customer' | 'artisan'>('customer');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    location: '',
    image: ''
  });
  const [showOrders, setShowOrders] = useState(false);
  const [refreshProducts, setRefreshProducts] = useState(0); // Force refresh trigger

  // Authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [signupForm, setSignupForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UPI Payment states
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [showUpiPin, setShowUpiPin] = useState(false);
  const [upiPin, setUpiPin] = useState('');

  // Persist cart and orders to localStorage
  useEffect(() => {
    localStorage.setItem('craftbazaar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('craftbazaar_orders', JSON.stringify(orders));
  }, [orders]);

  // Filter products based on search, category, and price
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`${product.name} quantity increased in cart! 🛒`, {
          description: `Now you have ${existingItem.quantity + 1} items`,
          action: {
            label: "View Cart",
            onClick: () => setShowCart(true),
          },
        });
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          artisan: product.artisan
        };
        toast.success(`${product.name} added to cart! 🎉`, {
          description: `By ${product.artisan} from ${product.location}`,
          action: {
            label: "View Cart",
            onClick: () => setShowCart(true),
          },
        });
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.success('Item removed from cart', {
      description: 'Product has been removed from your cart'
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error('Please login to checkout');
      setShowAuth(true);
      return;
    }
    
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setShowCheckout(true);
    setShowCart(false);
    setCurrentStep(1);
  };

  const processUpiPayment = async () => {
    if (!upiPin || upiPin.length !== 6) {
      toast.error('Please enter a valid 6-digit UPI PIN');
      return;
    }

    setShowUpiPin(false);
    setShowPaymentProcessing(true);
    setPaymentProgress(0);

    const progressSteps = [
      { progress: 20, message: "Authenticating UPI PIN..." },
      { progress: 40, message: `Connecting to ${upiApps.find(app => app.id === selectedUpiApp)?.name || 'UPI App'}...` },
      { progress: 60, message: "Processing UPI payment..." },
      { progress: 80, message: "Confirming transaction..." },
      { progress: 100, message: "Payment successful!" }
    ];

    try {
      for (let step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setPaymentProgress(step.progress);
        
        if (step.progress === 100) {
          completeOrder();
        }
      }
    } catch (error) {
      setShowPaymentProcessing(false);
      toast.error('UPI payment failed', {
        description: 'Please try again or use a different payment method'
      });
    }
  };

  const completeOrder = () => {
    // Calculate delivery charges
    const subtotal = getTotalPrice();
    const deliveryCharges = subtotal > 2000 ? 0 : 99;
    const totalAmount = subtotal + deliveryCharges;
    
    // Create order
    const newOrder: Order = {
      id: `CB${Date.now()}`,
      items: [...cart],
      total: totalAmount,
      status: 'confirmed',
      paymentMethod: orderDetails.paymentMethod === 'upi' ? 
        `UPI (${upiApps.find(app => app.id === selectedUpiApp)?.name || 'Other'})` : 
        orderDetails.paymentMethod,
      address: orderDetails.address,
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + (5 + Math.floor(Math.random() * 3)) * 24 * 60 * 60 * 1000)
    };
    
    setOrders(prev => [...prev, newOrder]);
    setCurrentOrder(newOrder);
    setCart([]);
    setShowPaymentProcessing(false);
    setShowCheckout(false);
    setShowOrderStatus(true);
    
    // Reset order details
    setOrderDetails({
      address: '',
      paymentMethod: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      upiId: ''
    });
    setCurrentStep(1);
    setSelectedUpiApp('');
    setUpiPin('');
    
    toast.success('Order placed successfully! 🎉', {
      description: `Order ID: ${newOrder.id} | Total: ₹${totalAmount.toLocaleString()}`,
      action: {
        label: "Track Order",
        onClick: () => {
          setShowOrderStatus(false);
          setShowOrders(true);
        },
      },
    });
  };

  const processPayment = async () => {
    if (!currentUser) {
      toast.error('Please login to place an order');
      setShowAuth(true);
      return;
    }

    // Validate payment details based on method
    if (orderDetails.paymentMethod === 'card') {
      if (!orderDetails.cardNumber || !orderDetails.expiryDate || !orderDetails.cvv) {
        toast.error('Please fill all card details');
        return;
      }
      if (orderDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      if (orderDetails.cvv.length !== 3) {
        toast.error('Please enter a valid 3-digit CVV');
        return;
      }
    }

    if (orderDetails.paymentMethod === 'upi') {
      if (!selectedUpiApp) {
        toast.error('Please select a UPI app');
        return;
      }
      if (selectedUpiApp === 'other' && (!orderDetails.upiId || !orderDetails.upiId.includes('@'))) {
        toast.error('Please enter a valid UPI ID');
        return;
      }
      // For UPI payments, show PIN modal first
      setShowUpiPin(true);
      return;
    }

    setShowPaymentProcessing(true);
    setPaymentProgress(0);

    // Simulate realistic payment processing
    const progressSteps = [
      { progress: 15, message: "Validating payment details..." },
      { progress: 30, message: "Connecting to payment gateway..." },
      { progress: 50, message: "Processing payment..." },
      { progress: 70, message: "Confirming transaction..." },
      { progress: 85, message: "Generating order..." },
      { progress: 100, message: "Payment successful!" }
    ];

    try {
      for (let step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPaymentProgress(step.progress);
        
        // Simulate potential payment failure (5% chance)
        if (step.progress === 50 && Math.random() < 0.05) {
          setShowPaymentProcessing(false);
          toast.error('Payment failed! Please try again.', {
            description: 'There was an issue processing your payment'
          });
          return;
        }
        
        if (step.progress === 100) {
          completeOrder();
        }
      }
    } catch (error) {
      setShowPaymentProcessing(false);
      toast.error('Payment processing failed', {
        description: 'Please try again or contact support'
      });
    }
  };

  // Authentication functions
  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill all fields');
      return;
    }

    // Mock authentication - in real app, this would call an API
    const user: User = {
      id: Date.now(),
      name: loginForm.email.split('@')[0].replace(/[^a-zA-Z]/g, '') || 'User',
      email: loginForm.email,
      userType: userType,
      location: 'India',
      joinDate: new Date()
    };

    setCurrentUser(user);
    setUserType(user.userType); // Ensure userType state is also updated
    setShowAuth(false);
    setLoginForm({ email: '', password: '' });
    setShowPassword(false);
    
    toast.success(`Welcome back, ${user.name}! 👋`, {
      description: `Logged in as ${user.userType}`,
    });
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      toast.error('Please fill all required fields');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Mock registration - in real app, this would call an API
    const user: User = {
      id: Date.now(),
      name: signupForm.name,
      email: signupForm.email,
      userType: signupForm.userType,
      location: signupForm.location,
      joinDate: new Date()
    };

    setCurrentUser(user);
    setUserType(user.userType);
    setShowAuth(false);
    setSignupForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'customer',
      location: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    
    toast.success(`Welcome to CraftBazaar, ${user.name}! 🎉`, {
      description: `Account created as ${user.userType}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType('customer');
    // Don't clear cart and orders - they should persist
    toast.success('Logged out successfully');
  };

  const addNewProduct = () => {
    if (!currentUser) {
      toast.error('Please login as an artisan to add products');
      setShowAuth(true);
      return;
    }

    if (currentUser.userType !== 'artisan') {
      toast.error('Only artisans can add products');
      return;
    }

    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill all required fields (Name, Price, Category)');
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      artisan: currentUser.name,
      location: newProduct.location || currentUser.location || 'India',
      price: parseInt(newProduct.price),
      originalPrice: parseInt(newProduct.originalPrice) || parseInt(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGFydCUyMGhvcnNlfGVufDF8fHx8MTc1ODM4MTY1MXww&ixlib=rb-4.1.0&q=80&w=400",
      rating: 0,
      reviews: 0,
      description: newProduct.description,
      inStock: true,
      artisanId: currentUser.id
    };

    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, product];
      return updatedProducts;
    });
    
    setNewProduct({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      location: '',
      image: ''
    });
    setShowAddProduct(false);
    setRefreshProducts(prev => prev + 1); // Force refresh
    
    toast.success('Product added successfully! 🎨', {
      description: 'Your craft is now live and available for purchase',
      action: {
        label: "View Product",
        onClick: () => {
          setSelectedCategory(product.category);
          setSearchQuery('');
        },
      },
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setPriceRange([0, 5000]);
    setSortBy('featured');
    toast.info('Filters cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-800 via-red-700 to-amber-700 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">CraftBazaar</h1>
              <p className="text-orange-200 hidden md:block">Supporting Local Artisans</p>
            </div>
            
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for crafts, artisans, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {currentUser && (
                <>
                  {(currentUser.userType === 'artisan' || userType === 'artisan') && (
                    <Button 
                      variant="ghost" 
                      className="text-white hover:text-orange-200"
                      onClick={() => setShowAddProduct(true)}
                    >
                      <Plus className="w-5 h-5" />
                      <span className="hidden md:inline ml-2">Add Product</span>
                    </Button>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-orange-200"
                    onClick={() => setShowOrders(true)}
                  >
                    <Package className="w-5 h-5" />
                    <span className="hidden md:inline ml-2">Orders ({orders.length})</span>
                  </Button>
                </>
              )}

              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-white text-sm font-medium">{currentUser.name}</span>
                    <span className="text-orange-200 text-xs capitalize">{currentUser.userType}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-orange-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden md:inline ml-2">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-orange-200"
                  onClick={() => setShowAuth(true)}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline ml-2">Login / Sign Up</span>
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className="text-white hover:text-orange-200 relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
                <span className="hidden md:inline ml-2">Cart</span>
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search crafts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-orange-800">Filters</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium mb-3 text-amber-800">Categories</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-orange-50 p-1 rounded">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3 text-amber-800">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    step={100}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="font-medium mb-3 text-amber-800">Sort By</h4>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3 text-amber-800">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="text-orange-600" />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm ml-1">& above</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-orange-900">
                {selectedCategory === 'All Categories' ? 'All Crafts' : selectedCategory}
              </h2>
              <p className="text-gray-600">{sortedProducts.length} products found</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={refreshProducts}>
              {sortedProducts.map(product => (
                <Card key={`${product.id}-${refreshProducts}`} className="group hover:shadow-xl transition-all duration-300 border-orange-200 bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      {product.originalPrice > product.price && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2 cursor-pointer hover:text-orange-700"
                          onClick={() => setSelectedProduct(product)}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">by {product.artisan}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        {product.location}
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xl font-bold text-orange-700">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 px-4 pb-4">
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Search className="w-16 h-16 text-orange-400" />
                </div>
                <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ImageWithFallback
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <p className="text-gray-600">by {selectedProduct.artisan}</p>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedProduct.location}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-orange-700">₹{selectedProduct.price.toLocaleString()}</span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                        <Badge className="bg-green-100 text-green-800">
                          {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% off
                        </Badge>
                      </>
                    )}
                  </div>

                  <p className="text-gray-700">{selectedProduct.description}</p>

                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={!selectedProduct.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedProduct(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cart Modal */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            </DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-4">Discover amazing crafts from local artisans</p>
              <Button variant="outline" onClick={() => setShowCart(false)} className="border-orange-300 text-orange-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-orange-50">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">by {item.artisan}</p>
                    <p className="font-bold text-orange-700">₹{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <div className="border-t pt-4 bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">Total: ₹{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowCart(false)} className="flex-1">
                    Continue Shopping
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Secure Checkout</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    currentStep >= step ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className="ml-2 text-sm">
                    {step === 1 ? 'Address' : step === 2 ? 'Payment' : 'Review'}
                  </span>
                  {step < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-4" />}
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Delivery Address</h3>
                <Textarea
                  placeholder="Enter your complete address including street, city, state, and pincode..."
                  value={orderDetails.address}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, address: e.target.value }))}
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={!orderDetails.address.trim()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="grid grid-cols-1 gap-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-orange-50 ${
                        orderDetails.paymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={orderDetails.paymentMethod === method.id}
                        onChange={(e) => setOrderDetails(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="mr-3"
                      />
                      <span className="mr-2">{method.icon}</span>
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>

                {orderDetails.paymentMethod === 'card' && (
                  <div className="space-y-3 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">💳 Card Details</h4>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={orderDetails.cardNumber}
                      onChange={(e) => {
                        // Format card number with spaces
                        const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        if (value.replace(/\s/g, '').length <= 16) {
                          setOrderDetails(prev => ({ ...prev, cardNumber: value }));
                        }
                      }}
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="MM/YY"
                        value={orderDetails.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          setOrderDetails(prev => ({ ...prev, expiryDate: value }));
                        }}
                        maxLength={5}
                      />
                      <Input
                        placeholder="CVV"
                        type="password"
                        value={orderDetails.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 3) {
                            setOrderDetails(prev => ({ ...prev, cvv: value }));
                          }
                        }}
                        maxLength={3}
                      />
                    </div>
                    <p className="text-xs text-blue-600">🔒 Your card details are secure and encrypted</p>
                  </div>
                )}

                {orderDetails.paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-3">📱 Choose UPI App</h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {upiApps.map((app) => (
                        <label
                          key={app.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-green-100 transition-colors ${
                            selectedUpiApp === app.id ? 'border-green-500 bg-green-100' : 'border-gray-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="upiApp"
                            value={app.id}
                            checked={selectedUpiApp === app.id}
                            onChange={(e) => setSelectedUpiApp(e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-8 h-8 rounded-full ${app.color} flex items-center justify-center text-white text-sm mr-3`}>
                            {app.icon}
                          </div>
                          <span className="text-sm font-medium">{app.name}</span>
                        </label>
                      ))}
                    </div>

                    {selectedUpiApp === 'other' && (
                      <div className="mt-3">
                        <Input
                          placeholder="Enter UPI ID (e.g., yourname@paytm)"
                          value={orderDetails.upiId}
                          onChange={(e) => setOrderDetails(prev => ({ ...prev, upiId: e.target.value }))}
                        />
                      </div>
                    )}

                    <p className="text-xs text-green-600 mt-3">
                      🔒 Secure UPI payment with PIN verification
                    </p>
                  </div>
                )}

                {orderDetails.paymentMethod === 'cod' && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">💰 Cash on Delivery</h4>
                    <p className="text-sm text-amber-700">Pay when your order is delivered to your doorstep.</p>
                    <p className="text-xs text-amber-600 mt-1">📋 Additional charges may apply for COD orders</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)}
                    disabled={!orderDetails.paymentMethod || (orderDetails.paymentMethod === 'upi' && !selectedUpiApp)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">Order Review</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} (×{item.quantity})</span>
                        <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Charges</span>
                      <span className={getTotalPrice() > 2000 ? "text-green-600" : ""}>
                        {getTotalPrice() > 2000 ? 'FREE' : '₹99'}
                      </span>
                    </div>
                    {getTotalPrice() > 2000 && (
                      <p className="text-xs text-green-600">🎉 Free delivery on orders above ₹2000</p>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-1">
                      <span>Total</span>
                      <span>₹{(getTotalPrice() + (getTotalPrice() > 2000 ? 0 : 99)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <p className="text-sm">{orderDetails.address}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Payment Method</h4>
                  <p className="text-sm">
                    {paymentMethods.find(m => m.id === orderDetails.paymentMethod)?.name}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={processPayment} className="flex-1 bg-green-600 hover:bg-green-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Processing Modal */}
      <Dialog open={showPaymentProcessing} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Processing Payment</h3>
            <Progress value={paymentProgress} className="w-full" />
            <p className="text-sm text-gray-600">
              {paymentProgress < 100 ? 'Please wait while we process your payment...' : 'Payment successful!'}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Status Modal */}
      <Dialog open={showOrderStatus} onOpenChange={setShowOrderStatus}>
        <DialogContent className="max-w-lg">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-600">Order Placed Successfully!</h3>
            {currentOrder && (
              <div className="space-y-3">
                <p className="text-gray-600">Order ID: <span className="font-mono">{currentOrder.id}</span></p>
                <p className="text-sm text-gray-500">
                  Estimated delivery: {currentOrder.estimatedDelivery.toLocaleDateString()}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Thank you for supporting local artisans! 🎨</h4>
                  <p className="text-sm text-blue-600">
                    Your order helps preserve traditional crafts and supports artisan communities across India.
                  </p>
                </div>
              </div>
            )}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowOrderStatus(false)} className="flex-1">
                Continue Shopping
              </Button>
              <Button onClick={() => {
                setShowOrderStatus(false);
                setShowOrders(true);
              }} className="flex-1 bg-orange-600 hover:bg-orange-700">
                Track Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Orders Modal */}
      <Dialog open={showOrders} onOpenChange={setShowOrders}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your Orders</DialogTitle>
          </DialogHeader>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <Card key={order.id} className="border-orange-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">
                          Placed on {order.orderDate.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={`${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'confirmed' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'delivered' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {order.status === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
                        {order.status === 'confirmed' && <Clock className="w-3 h-3 mr-1" />}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-orange-700">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-bold">Total: ₹{order.total.toLocaleString()}</span>
                        <span className="text-sm text-gray-600">
                          Est. delivery: {order.estimatedDelivery.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Authentication Modal */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              {authMode === 'login' ? 'Welcome Back!' : 'Join CraftBazaar'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'signup')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Login as</label>
                  <Select value={userType} onValueChange={(value: 'customer' | 'artisan') => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="artisan">Artisan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleLogin} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!loginForm.email || !loginForm.password}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
                  <div className="text-xs text-gray-500">
                    <p>Email: demo@craftbazaar.com</p>
                    <p>Password: demo123</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password *</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password (min 6 chars)"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Account Type *</label>
                  <Select value={signupForm.userType} onValueChange={(value: 'customer' | 'artisan') => setSignupForm(prev => ({ ...prev, userType: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer - Browse and buy crafts</SelectItem>
                      <SelectItem value="artisan">Artisan - Sell your crafts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    placeholder="Enter your city, state"
                    value={signupForm.location}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <Button 
                  onClick={handleSignup} 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* UPI PIN Modal */}
      <Dialog open={showUpiPin} onOpenChange={() => {}}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full ${upiApps.find(app => app.id === selectedUpiApp)?.color || 'bg-green-600'} flex items-center justify-center text-white`}>
                {upiApps.find(app => app.id === selectedUpiApp)?.icon || '📱'}
              </div>
              <span>Enter UPI PIN</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Enter your {upiApps.find(app => app.id === selectedUpiApp)?.name || 'UPI'} PIN to complete the payment
              </p>
              
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold ${
                      upiPin.length > i ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    {upiPin.length > i ? '●' : ''}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    className="h-12 text-lg font-semibold"
                    onClick={() => {
                      if (upiPin.length < 6) {
                        setUpiPin(prev => prev + num);
                      }
                    }}
                  >
                    {num}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="h-12 text-lg"
                  onClick={() => setUpiPin(prev => prev.slice(0, -1))}
                >
                  ⌫
                </Button>
                <Button
                  variant="outline"
                  className="h-12 text-lg font-semibold"
                  onClick={() => {
                    if (upiPin.length < 6) {
                      setUpiPin(prev => prev + '0');
                    }
                  }}
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  className="h-12 text-lg"
                  onClick={() => setUpiPin('')}
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowUpiPin(false);
                  setUpiPin('');
                }} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={processUpiPayment}
                disabled={upiPin.length !== 6}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Pay ₹{(getTotalPrice() + (getTotalPrice() > 2000 ? 0 : 99)).toLocaleString()}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500">
              🔒 Your UPI PIN is secure and not stored anywhere
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Product Modal */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <Input
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Original Price</label>
                <Input
                  type="number"
                  placeholder="Enter original price"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                placeholder="Enter your location"
                value={newProduct.location}
                onChange={(e) => setNewProduct(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Image URL</label>
              <Input
                placeholder="Enter image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct(prev => ({ ...prev, image: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                placeholder="Describe your product..."
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowAddProduct(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={addNewProduct} className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}