import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const ProductGrid = () => {
  const {
    selectedCategory,
    sortedProducts,
    clearFilters
  } = useAppContext();

  return (
    <main className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-orange-900">
          {selectedCategory === 'All Categories' ? 'All Crafts' : selectedCategory}
        </h2>
        <p className="text-gray-600">{sortedProducts.length} products found</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-32 h-32 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-orange-400" />
          </div>
          <p className="text-gray-500 text-lg mb-4">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default ProductGrid;