import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents, renderUrlImageValidate } from '@/helpers/Methods';
import { IFoodReadModel } from '@/services/Foods/Foods.type';
import React from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';
import AuthPrompt from '../AuthPrompt/AuthPrompt';

interface FoodCardProps {
  food: IFoodReadModel;
  onSelectFood: (food: IFoodReadModel) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onSelectFood }) => {
  const navigate = useNavigate();
  const [showAuthPrompt, setShowAuthPrompt] = React.useState(false);
  const { name: title, price, url: image, description } = food;
  const { user, isAuthenticated } = useAuthContext();
  const { addToCart } = useCart();

  const handleAddCart = () => {
    if (!isAuthenticated) {
      return setShowAuthPrompt(true);
    }
    addToCart(food)
  }

  return (
    <div className="bg-sidebar rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={renderUrlImageValidate(image)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onClick={() => onSelectFood(food)}
        />
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 m-2 rounded-full font-medium">
          {formatCurrencyInCents(price)}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div  onClick={() => onSelectFood(food)}>
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
          {description && (
            <p className="line-clamp-2 text-sm mb-3">{description}</p>
          )}
        </div>
        <Button
          onClick={handleAddCart}
          className="mt-4 bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 py-2 px-4 cursor-pointer rounded-md flex items-center justify-center">
          Adicionar
        </Button>
        {user.isMaster && <Button
          onClick={() => navigate('/adicionar-comida/' + food.id)}
          variant='outline'
          className="mt-4 py-2 px-4 rounded-md flex items-center justify-center cursor-pointer">
          Editar
        </Button>}
      </div>

      <AuthPrompt
        show={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        action="adicionar item ao carrinho"
      />
    </div>
  );
};

export default FoodCard;