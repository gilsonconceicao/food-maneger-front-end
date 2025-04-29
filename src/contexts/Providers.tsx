import { SidebarProvider } from '@/components/ui/sidebar'
import { AppRoutes } from '@/routes/AppRoutes'
import { BrowserRouter } from 'react-router'

export const Providers = () => {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <AppRoutes />
            </SidebarProvider>
        </BrowserRouter>
    )
}
