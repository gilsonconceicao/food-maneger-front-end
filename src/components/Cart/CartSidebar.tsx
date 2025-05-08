import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { useAuthContext } from '@/contexts/AuthContext';

const CartSidebar: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    total,
    isEmptyCartList
  } = useCart();
  const { isAuthenticated } = useAuthContext();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      return;
    }
  };

  return (
    <>

      <div className="flex-1 overflow-y-auto p-3">
        {isEmptyCartList ? (
          <div className="text-center py-8 ">
            Seu carrinho está vazio
          </div>
        ) : (
          <div className="space-y-4">
            {items.map(item => {
              const name = item.food.name;
              const price = item.food.price;
              const url = item.food.url;
              const imageUrl = url !== null ? `https://${url}` : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800';

              return (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{name}</h3>
                    <div className="text-orange-500 font-medium">
                      {formatCurrencyInCents(price)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {!isEmptyCartList &&
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrencyInCents(total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Finalizar Pedido
          </button>
        </div>}
    </>
  );
};

export default CartSidebar;