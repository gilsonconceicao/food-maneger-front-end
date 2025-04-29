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
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SidebarProvider>
                        <AuthenticatedLayout>
                            <CartProvider>
                                <ToastCustom />
                                <AppRoutes />
                            </CartProvider>
                        </AuthenticatedLayout>
                    </SidebarProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    )
}
