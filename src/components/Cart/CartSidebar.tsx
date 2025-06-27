import React from 'react';
import { Loader2, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrencyInCents } from '@/helpers/Methods';

interface CartSidebarProps {
  generateOrderAsync: () => void;
  isLoading: boolean;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ generateOrderAsync, isLoading: isLoadingCreateOrder }) => {
  const { items, updateQuantityNoOrder, removeFromCart, total, isEmptyCartList, isLoading } = useCart();

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
          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
            {items.map(item => {
              const name = item.food.name;
              const price = item.food.price;
              const quantity = item.quantity;
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
                    <div className='flex items-center justify-between gap-2'>
                      <div className="text-gray-400 font-medium">
                        {formatCurrencyInCents(price)}
                      </div>
                      <div className="text-orange-500 font-medium">
                        {formatCurrencyInCents(price * quantity)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantityNoOrder(item.foodId, quantity - 1)}
                        className="p-1 hover:bg-muted rounded"
                        disabled={isLoading || quantity === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantityNoOrder(item.foodId, quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
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
        <div className="border-t p-4 space-y-4 absolute bottom-0 left-0 right-0">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrencyInCents(total)}</span>
          </div>
          <button
            onClick={generateOrderAsync}
            disabled={isLoading || isLoadingCreateOrder}
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Realizar Pedido
          </button>
        </div>}
    </>
  );
};

export default CartSidebar;