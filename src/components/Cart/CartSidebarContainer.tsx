import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import CartSidebar from './CartSidebar';
import { useCreateOrderMutation } from '@/hooks/Order/useOrderHook';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useCart } from '@/contexts/CartContext';

interface CartSidebarContainerProps {
  onCloseSidebar: () => void; 
}

const CartSidebarContainer: React.FC<CartSidebarContainerProps> = ({ onCloseSidebar }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user} = useAuthContext();
    const { items, refetchCartList} = useCart();
  

  const onSuccess = (orderId: string) => {
    toast.success("Pedido realizado com sucesso.");
    navigate(`/pedidos/${orderId}`);
    onCloseSidebar(); 
    refetchCartList();
  }

  const { mutateAsync, isPending: isLoading } = useCreateOrderMutation(onSuccess);

  const generateOrderAsync = async () => {
    if (!isAuthenticated) {
      return;
    }

    const cartsIds = items.map(cart => cart.id);

    await mutateAsync({
      userId: user.userId!,
      cartIds: cartsIds
    });
    
  };

  return (
    <CartSidebar {...{
      generateOrderAsync,
      isLoading
    }} />
  );
};

export default CartSidebarContainer;