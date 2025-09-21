import React from 'react';
import { CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useAppContext } from '../../context/AppContext';
import { paymentMethods, upiApps } from '../../data/mockData';

const CheckoutModal = () => {
  const {
    showCheckout,
    setShowCheckout,
    currentStep,
    setCurrentStep,
    orderDetails,
    setOrderDetails,
    selectedUpiApp,
    setSelectedUpiApp,
    cart,
    getTotalPrice,
    processPayment
  } = useAppContext();

  return (
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
                  {orderDetails.paymentMethod === 'upi' && selectedUpiApp && (
                    <span> - {upiApps.find(app => app.id === selectedUpiApp)?.name}</span>
                  )}
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
  );
};

export default CheckoutModal;