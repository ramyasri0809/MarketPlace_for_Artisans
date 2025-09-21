import React from 'react';
import { Toaster } from 'sonner';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import CartModal from './components/modals/CartModal';
import CheckoutModal from './components/modals/CheckoutModal';
import AuthModal from './components/modals/AuthModal';
import ProductDetailModal from './components/modals/ProductDetailModal';
import OrdersModal from './components/modals/OrdersModal';
import AddProductModal from './components/modals/AddProductModal';
import PaymentProcessingModal from './components/modals/PaymentProcessingModal';
import OrderStatusModal from './components/modals/OrderStatusModal';
import UpiPinModal from './components/modals/UpiPinModal';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <FilterSidebar />
            <ProductGrid />
          </div>
        </div>

        {/* Modals */}
        <ProductDetailModal />
        <CartModal />
        <CheckoutModal />
        <PaymentProcessingModal />
        <OrderStatusModal />
        <OrdersModal />
        <AuthModal />
        <AddProductModal />
        <UpiPinModal />
        
        <Toaster position="bottom-right" />
      </div>
    </AppProvider>
  );
}

export default App;