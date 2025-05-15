import React from 'react';
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { useAuthContext } from '@/contexts/AuthContext';

const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total, isEmptyCartList, isLoading } = useCart();
  const { isAuthenticated } = useAuthContext();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      return;
    }
  };

  return (
    <>

      <div className="flex-1 overflow-y-auto p-3">
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          </div>
        )}

        {!isLoading && isEmptyCartList && (
          <div className="text-center py-8 text-gray-500">
            Seu carrinho está vazio
          </div>
        )}

        {!isLoading && !isEmptyCartList && (
          <div className="space-y-4">
            {items.map(item => {
              const name = item.food.name;
              const price = item.food.price;
              const url = item.food.url;

              return (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <img
                    src={url}
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
                        disabled={isLoading}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                        disabled={isLoading}
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

      {!isEmptyCartList && !isLoading &&
        <div className="border-t p-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrencyInCents(total)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Finalizar Pedido
          </button>
        </div>}
    </>
  );
};

export default CartSidebar;