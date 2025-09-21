import React from 'react';
import { CreditCard } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { useAppContext } from '../../context/AppContext';

const PaymentProcessingModal = () => {
  const {
    showPaymentProcessing,
    paymentProgress
  } = useAppContext();

  return (
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
  );
};

export default PaymentProcessingModal;