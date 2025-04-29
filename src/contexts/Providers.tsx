import { Layout } from '@/components/Layout/Layout'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppRoutes } from '@/routes/AppRoutes'
import { BrowserRouter } from 'react-router'

export const Providers = () => {
    return (
        <BrowserRouter>
            <SidebarProvider>
                <Layout>
                
                    <AppRoutes />
                </Layout>
            </SidebarProvider>
        </BrowserRouter>
    )
}
