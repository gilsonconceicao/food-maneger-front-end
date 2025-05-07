import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOutIcon, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useCart } from '@/contexts/CartContext';
import { CustomDrawer } from '../Drawer/Drawer';
import CartSidebar from '../Cart/CartSidebar';
import { Link } from "react-router";

export const Header = () => {

    const [action, setAction] = useState<string | undefined>(undefined);
    const { isAuthenticated, logoutUserAsync, user } = useAuthContext();
    const { isMobile } = useSidebar()
    const handleLogout = () => logoutUserAsync();

    const { items } = useCart();
    const itemCount = items?.length;

    const onClose = () => setAction(undefined)

    return (
        <div className="bg-sidebar flex justify-between items-center p-4 ">
            <div className="flex items-center gap-2 ">
                <div>

                    {isMobile && <SidebarTrigger />}
                </div>
                <div>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {isAuthenticated ? `Olá, ${user?.name}` : 'Bem-vindo(a)'}
                    </p>

                </div>
            </div>
            <div className="text-balance font-bold">
                {!isAuthenticated ? (
                    <div className='flex justify-between items-center gap-2'>
                        <Button asChild variant="outline">
                            <Link to="/cadastro">Cadastrar</Link>
                        </Button>
                        <Button asChild>
                            <Link to="/login">Entrar</Link>
                        </Button>

                    </div>
                ) : (
                    <div className='flex justify-between items-center gap-2'>
                        <button
                            className="relative bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors"
                            onClick={() => setAction('cart')}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <Button variant="outline" size="icon" onClick={() => setAction('logout')}>
                            <LogOutIcon />
                        </Button>

                    </div>
                )}
            </div>

            <Modal
                open={action === 'logout'}
                onOpenChange={onClose}
                title="Sair"
                description="Você tem certeza que deseja sair do sistema?"
                confirmText="Sair"
                cancelText="Cancelar"
                onConfirm={handleLogout}
                onCancel={onClose}
            />

            <CustomDrawer
                open={action === 'cart'}
                onOpenChange={onClose}
                title="Carrinho de compras"
                description="Confira os itens que você adicionou ao carrinho."
                confirmText="Ir para o pagamento"
                cancelText="Fechar"
                onCancel={onClose}
                children={<CartSidebar />}
            />
        </div>
    )
}
