import React from 'react';
import { Heart, Star, MapPin, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProduct } = useAppContext();

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-orange-200 bg-white overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          >
            <Heart className="w-4 h-4" />
          </Button>
          {product.originalPrice > product.price && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 cursor-pointer hover:text-orange-700"
              onClick={() => setSelectedProduct(product)}>
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">by {product.artisan}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="w-3 h-3 mr-1" />
            {product.location}
          </div>
          
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-orange-700">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;