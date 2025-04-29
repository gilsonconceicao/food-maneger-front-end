import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
    
    return (
        <div className="bg-sidebar flex justify-between items-center p-4 ">
            <div className="text-balance font-bold">Olá, Gilson!</div>
            <SidebarTrigger/>
        </div>
    )
}
