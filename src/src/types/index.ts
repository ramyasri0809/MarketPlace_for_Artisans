export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  artisan: string;
}

export interface Product {
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

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: string;
  address: string;
  orderDate: Date;
  estimatedDelivery: Date;
}

export interface NewProduct {
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  location: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  userType: 'customer' | 'artisan';
  location?: string;
  joinDate: Date;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'customer' | 'artisan';
  location: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface UpiApp {
  id: string;
  name: string;
  icon: string;
  color: string;
}