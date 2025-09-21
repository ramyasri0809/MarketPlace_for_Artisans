import React from 'react';
import { Search, User, ShoppingCart, Plus, Package, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    cart,
    orders,
    currentUser,
    userType,
    setShowCart,
    setShowAuth,
    setShowAddProduct,
    setShowOrders,
    handleLogout,
  } = useAppContext();

  return (
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
  );
};

export default Header;