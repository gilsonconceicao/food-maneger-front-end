import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { IFoodReadModel } from '@/services/Foods/Foods.type';
import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents, renderUrlImageValidate } from '@/helpers/Methods';
import { Button } from '../ui/button';

interface FoodDetailsProps {
  food: IFoodReadModel;
  onClose: () => void;
  showFoodDetails?: boolean
}

const FoodDetails: React.FC<FoodDetailsProps> = ({ food, onClose, showFoodDetails }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }
    onClose();
  };

  if (!showFoodDetails) {
    return null;
  }

  const imageUrl = renderUrlImageValidate(food.url);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-sidebar  rounded-lg shadow-xl max-w-2xl w-full animate-fade-in overflow-hidden">
        <div className="relative h-64 sm:h-80">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-sidebar p-2 rounded-full hover:bg-gray-800 cursor-pointer transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={imageUrl}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{food.name}</h2>
              {food.category && (
                <span className="text-sm text-orange-500 font-medium">{food.categoryDisplay}</span>
              )}
            </div>
            <div className="text-2xl font-bold text-orange-500">
              {formatCurrencyInCents(food.price)}
            </div>
          </div>

          {food.description && (
            <p className="text-gray-200 mb-6">{food.description}</p>
          )}

          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <Button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-1  rounded-full transition-colors"
                
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                onClick={() => setQuantity(q => q + 1)}
                className="p-1  rounded-full transition-colors"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white "
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;