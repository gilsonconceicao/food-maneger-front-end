import { AuthenticatedLayout } from '@/components/Layout/AuthenticatedLayout'
import { ToastCustom } from '@/components/Toast'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppRoutes } from '@/routes/AppRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'

export const Providers = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <SidebarProvider>
                            <AuthenticatedLayout>
                                <ToastCustom />
                                <AppRoutes />
                            </AuthenticatedLayout>
                        </SidebarProvider>
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};