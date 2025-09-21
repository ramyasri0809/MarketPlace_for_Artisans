import React from 'react';
import { Star, MapPin, ShoppingCart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useAppContext } from '../../context/AppContext';

const ProductDetailModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart
  } = useAppContext();

  if (!selectedProduct) return null;

  return (
    <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;