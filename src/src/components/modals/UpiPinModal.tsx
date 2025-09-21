import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { useAppContext } from '../../context/AppContext';
import { upiApps } from '../../data/mockData';

const UpiPinModal = () => {
  const {
    showUpiPin,
    setShowUpiPin,
    selectedUpiApp,
    upiPin,
    setUpiPin,
    processUpiPayment,
    getTotalPrice,
    setShowCheckout
  } = useAppContext();

  const handleCancel = () => {
    setShowUpiPin(false);
    setUpiPin('');
    setShowCheckout(true); // Reopen checkout modal
  };

  return (
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
              onClick={handleCancel} 
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
  );
};

export default UpiPinModal;