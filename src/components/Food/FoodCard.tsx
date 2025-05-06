import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { Food } from '@/services/Foods/Foods.type';
import React from 'react';
import { Button } from '../ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router';

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const navigate = useNavigate();
  const { name: title, price, url: image, description } = food;
  const { user } = useAuthContext();
  const { addToCart } = useCart();
  
  // Default image if none provided
  const imageUrl = image !== null ? `https://${image}` : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="bg-sidebar rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 m-2 rounded-full font-medium">
          {formatCurrencyInCents(price)}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
          {description && (
            <p className="line-clamp-2 text-sm mb-3">{description}</p>
          )}
        </div>
        <Button 
          onClick={() => addToCart(food)}
          className="mt-4 bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300 py-2 px-4 rounded-md flex items-center justify-center">
          Adicionar
        </Button>
        {user.isMaster && <Button 
          onClick={() => navigate('/adicionar-comida/'+food.id)}
          variant='outline'
          className="mt-4 py-2 px-4 rounded-md flex items-center justify-center">
          Editar
        </Button>}
      </div>
    </div>
  );
};

export default FoodCard;