import React from 'react';
import { ShoppingCart, X, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useAppContext } from '../../context/AppContext';

const CartModal = () => {
  const {
    showCart,
    setShowCart,
    cart,
    removeFromCart,
    updateCartQuantity,
    getTotalPrice,
    handleCheckout
  } = useAppContext();

  return (
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
  );
};

export default CartModal;