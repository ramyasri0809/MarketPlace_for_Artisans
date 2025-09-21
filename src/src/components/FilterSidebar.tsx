import React from 'react';
import { Filter, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useAppContext } from '../context/AppContext';
import { categories } from '../data/mockData';

const FilterSidebar = () => {
  const {
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    selectedCategory,
    setSelectedCategory,
    clearFilters
  } = useAppContext();

  return (
    <aside className="lg:w-64 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-orange-800">Filters</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3 text-amber-800">Categories</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer hover:bg-orange-50 p-1 rounded">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3 text-amber-800">Price Range</h4>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              step={100}
              className="mb-3"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="text-xs"
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                className="text-xs"
              />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 className="font-medium mb-3 text-amber-800">Sort By</h4>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium mb-3 text-amber-800">Rating</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="text-orange-600" />
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm ml-1">& above</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;