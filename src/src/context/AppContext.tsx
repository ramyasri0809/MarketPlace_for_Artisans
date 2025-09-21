import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { mockProducts, categories, paymentMethods, upiApps } from '../data/mockData';
import { Product, CartItem, Order, User, LoginForm, SignupForm, NewProduct } from '../types';

interface AppContextType {
  // State
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  priceRange: number[];
  sortBy: string;
  showFilters: boolean;
  selectedProduct: Product | null;
  showCart: boolean;
  showCheckout: boolean;
  currentStep: number;
  orderDetails: any;
  showPaymentProcessing: boolean;
  paymentProgress: number;
  showOrderStatus: boolean;
  currentOrder: Order | null;
  userType: 'customer' | 'artisan';
  showAddProduct: boolean;
  newProduct: NewProduct;
  showOrders: boolean;
  refreshProducts: number;
  currentUser: User | null;
  showAuth: boolean;
  authMode: 'login' | 'signup';
  loginForm: LoginForm;
  signupForm: SignupForm;
  showPassword: boolean;
  showConfirmPassword: boolean;
  selectedUpiApp: string;
  showUpiPin: boolean;
  upiPin: string;

  // Actions
  setProducts: (products: Product[]) => void;
  setCart: (cart: CartItem[]) => void;
  setOrders: (orders: Order[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: number[]) => void;
  setSortBy: (sort: string) => void;
  setShowFilters: (show: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  setShowCart: (show: boolean) => void;
  setShowCheckout: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
  setOrderDetails: (details: any) => void;
  setShowPaymentProcessing: (show: boolean) => void;
  setPaymentProgress: (progress: number) => void;
  setShowOrderStatus: (show: boolean) => void;
  setCurrentOrder: (order: Order | null) => void;
  setUserType: (type: 'customer' | 'artisan') => void;
  setShowAddProduct: (show: boolean) => void;
  setNewProduct: (product: NewProduct) => void;
  setShowOrders: (show: boolean) => void;
  setRefreshProducts: (refresh: number) => void;
  setCurrentUser: (user: User | null) => void;
  setShowAuth: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'signup') => void;
  setLoginForm: (form: LoginForm) => void;
  setSignupForm: (form: SignupForm) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  setSelectedUpiApp: (app: string) => void;
  setShowUpiPin: (show: boolean) => void;
  setUpiPin: (pin: string) => void;

  // Functions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  handleCheckout: () => void;
  processPayment: () => Promise<void>;
  processUpiPayment: () => Promise<void>;
  completeOrder: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
  handleLogout: () => void;
  addNewProduct: () => void;
  clearFilters: () => void;
  filteredProducts: Product[];
  sortedProducts: Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
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
  const [refreshProducts, setRefreshProducts] = useState(0);
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
    const subtotal = getTotalPrice();
    const deliveryCharges = subtotal > 2000 ? 0 : 99;
    const totalAmount = subtotal + deliveryCharges;
    
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
    }

    // UPI Payment with PIN entry
    if (orderDetails.paymentMethod === 'upi') {
      setShowUpiPin(true);
      return;
    }

    setShowPaymentProcessing(true);
    setPaymentProgress(0);

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

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill all fields');
      return;
    }

    const user: User = {
      id: Date.now(),
      name: loginForm.email.split('@')[0].replace(/[^a-zA-Z]/g, '') || 'User',
      email: loginForm.email,
      userType: userType,
      location: 'India',
      joinDate: new Date()
    };

    setCurrentUser(user);
    setUserType(user.userType);
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

    setProducts(prevProducts => [...prevProducts, product]);
    
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
    setRefreshProducts(prev => prev + 1);
    
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

  const value: AppContextType = {
    // State
    products,
    cart,
    orders,
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    showFilters,
    selectedProduct,
    showCart,
    showCheckout,
    currentStep,
    orderDetails,
    showPaymentProcessing,
    paymentProgress,
    showOrderStatus,
    currentOrder,
    userType,
    showAddProduct,
    newProduct,
    showOrders,
    refreshProducts,
    currentUser,
    showAuth,
    authMode,
    loginForm,
    signupForm,
    showPassword,
    showConfirmPassword,
    selectedUpiApp,
    showUpiPin,
    upiPin,

    // Actions
    setProducts,
    setCart,
    setOrders,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    setShowFilters,
    setSelectedProduct,
    setShowCart,
    setShowCheckout,
    setCurrentStep,
    setOrderDetails,
    setShowPaymentProcessing,
    setPaymentProgress,
    setShowOrderStatus,
    setCurrentOrder,
    setUserType,
    setShowAddProduct,
    setNewProduct,
    setShowOrders,
    setRefreshProducts,
    setCurrentUser,
    setShowAuth,
    setAuthMode,
    setLoginForm,
    setSignupForm,
    setShowPassword,
    setShowConfirmPassword,
    setSelectedUpiApp,
    setShowUpiPin,
    setUpiPin,

    // Functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalPrice,
    handleCheckout,
    processPayment,
    processUpiPayment,
    completeOrder,
    handleLogin,
    handleSignup,
    handleLogout,
    addNewProduct,
    clearFilters,
    filteredProducts,
    sortedProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};