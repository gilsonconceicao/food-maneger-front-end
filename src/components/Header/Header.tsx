import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '../ui/button';
import { LogOutIcon, ShoppingCart, User, ZapIcon } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useCart } from '@/contexts/CartContext';
import { CustomDrawer } from '../Drawer/Drawer';
import { Link } from "react-router";
import AuthPrompt from '../AuthPrompt/AuthPrompt';
import CartSidebarContainer from '../Cart/CartSidebarContainer';
import './header.style.css'

export const Header = () => {
    const [action, setAction] = useState<string | undefined>(undefined);
    const [showAuthPrompt, setShowAuthPrompt] = useState(false);

    const { isMobile } = useSidebar()
    const { items, toggleCart, isCartOpen } = useCart();
    const { isAuthenticated, logoutUserAsync, user } = useAuthContext();

    const handleLogout = () => logoutUserAsync();

    const overrideToggleMenu = () => {
        if (!isAuthenticated) return setShowAuthPrompt(true);
        return;
    }


    const itemCount = items?.length;
    const onClose = () => setAction(undefined)

    return (
       <div className="bg-sidebar flex justify-between items-center p-4 md:relative fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center gap-2 ">
                <div>
                    {isMobile && <SidebarTrigger onClick={overrideToggleMenu} showIconLock={!isAuthenticated && showAuthPrompt} />}
                </div>
                <div className='flex items-center space-x-2' >
                    {!isMobile && <ZapIcon className='w-7 h-7 text-orange-300 mb-1' />}
                    {isMobile ? (
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            {isAuthenticated ? `Olá, ${user?.name}` : 'Bem-vindo(a)'}
                        </p>
                    ) : <p className={`header-title`}>
                        Da Panela Pra Mesa
                    </p>}

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
                    <div className='flex justify-between items-center gap-4'>
                        <button
                            className="relative bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors  "
                            onClick={toggleCart}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <Link
                            to="/perfil"
                            className="bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors"
                        >
                            <User className="h-5 w-5" />
                        </Link>
                        {
                            isMobile ? (
                                <Button variant="outline" size="icon" onClick={() => setAction('logout')}>
                                    <LogOutIcon />
                                </Button>

                            ) : (
                                <Button variant="outline" onClick={() => setAction('logout')}>
                                    Sair
                                    <LogOutIcon />
                                </Button>

                            )
                        }

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
                open={isCartOpen}
                onOpenChange={toggleCart}
                title="Carrinho de compras"
                description="Confira os itens que você adicionou ao carrinho."
                confirmText="Ir para o pagamento"
                children={<CartSidebarContainer onCloseSidebar={toggleCart} />}
            />

            <AuthPrompt
                show={showAuthPrompt}
                onClose={() => setShowAuthPrompt(false)}
            />
        </div>
    )
}
