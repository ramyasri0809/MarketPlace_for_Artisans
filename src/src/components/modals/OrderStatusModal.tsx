import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { useAppContext } from '../../context/AppContext';

const OrderStatusModal = () => {
  const {
    showOrderStatus,
    setShowOrderStatus,
    currentOrder,
    setShowOrders
  } = useAppContext();

  return (
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
  );
};

export default OrderStatusModal;