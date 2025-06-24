import { FoodCategoryDescriptions } from '@/services/Enums/FoodCategoryEnum';
import React from 'react';

interface FilterFoodProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterFood: React.FC<FilterFoodProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange
}) => {
  return (
    <div className="overflow-x-auto pb-2 mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex space-x-2 min-w-max">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            activeCategory === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onCategoryChange('all')}
        >
          Todos
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {FoodCategoryDescriptions[category as keyof typeof FoodCategoryDescriptions]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterFood;
