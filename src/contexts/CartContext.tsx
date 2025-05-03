/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createCartsAsync, deleteCartsAsync, getCartsListAsyc } from '@/services/Carts';
import { Food } from '@/services/Foods/Foods.type';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import { Cart } from '@/services/Carts/Types/CartsType';
import toast from 'react-hot-toast';

interface CartContextData {
  items: Cart[];
  addToCart: (food: Food) => Promise<void>;
  removeFromCart: (foodId: string) => Promise<void>;
  updateQuantity: (foodId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  isLoading: boolean;
  isEmptyCartList: boolean;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuthContext();

  const [items, setItems] = useState<Cart[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      const loadCart = async () => {
        setIsLoading(true);
        try {
          const cartData = await getCartsListAsyc(token!);
          setItems(cartData.data.data as Cart[]);
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      loadCart();
    }
    
  }, [token]);

  const addToCart = useCallback(async (food: Food) => {
    setIsLoading(true);
    try {
      await createCartsAsync({
        foodId: food.id,
        quantity: 1
      }, token!);
      const cartData = await getCartsListAsyc(token!);
      setItems(cartData.data.data as Cart[]);
      toast.success("Item adicionado com sucesso"); 
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (foodId: string) => {
    setIsLoading(true);
    try {
      await deleteCartsAsync(foodId, token!);
      const cartData = await getCartsListAsyc(token!);
      setItems(cartData.data.data as Cart[]);
      toast.success("Item removido com sucesso"); 
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (foodId: string, quantity: number) => {
    setIsLoading(true);
    try {
      await createCartsAsync({
        foodId: foodId,
        quantity: quantity
      }, token!);
      const cartData = await getCartsListAsyc(token!);
      setItems(cartData.data.data as Cart[]);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all(items?.map((x) => removeFromCart(x.id)))
      setItems([]);
      toast.success("Sucesso ao limpar carrinho de compras"); 
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const total = items.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        isCartOpen,
        toggleCart,
        isLoading, 
        isEmptyCartList: items?.length === 0
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}