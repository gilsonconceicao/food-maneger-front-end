import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { Loader2 } from 'lucide-react';
import { IFoodReadModel } from '@/services/Foods/Foods.type';
import FoodDetails from './FoodDetatails';
import { useAuthContext } from '@/contexts/AuthContext';

interface FoodGridProps {
  foods: IFoodReadModel[];
  isLoading: boolean;
  error: Error | null;
  lastFoodRef?: (node: HTMLDivElement | null) => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

const FoodGrid: React.FC<FoodGridProps> = ({
  foods,
  isLoading,
  error,
  lastFoodRef,
  isLoadingMore,
  hasMore
}) => {
  const { isAuthenticated } = useAuthContext();
  const [ selectedFood, setSelectedFood ] = useState<IFoodReadModel | null>(null);

  const onSelectFood = (food: IFoodReadModel) => {
    if (!isAuthenticated) return;
    setSelectedFood(food);
  }

  if (isLoading && !isLoadingMore) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Não foi possível carregar os itens</p>
        <p className="text-sm">{error.message}</p>
        <button className="mt-2 text-sm bg-white border border-red-300 hover:bg-red-50 text-red-700 font-medium py-1 px-3 rounded-md transition-colors">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-8 rounded-md text-center">
        <p className="font-medium">Nenhum item encontrado</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full overflow-hidden">
        {foods.map((food, index) => (
          <div
            key={index}
            ref={index === foods.length - 1 ? lastFoodRef : null}
            className="min-w-0"
          >
            <FoodCard food={food} onSelectFood={onSelectFood}/>
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className="flex justify-center items-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      )}

      {!hasMore && foods.length > 0 && (
        <div className="text-center mt-8 text-gray-500">
          Não há mais itens para carregar
        </div>
      )}

      <FoodDetails
        showFoodDetails={!!selectedFood}
        food={selectedFood!}
        onClose={() => setSelectedFood(null)}
      />
    </>
  );
};

export default FoodGrid;