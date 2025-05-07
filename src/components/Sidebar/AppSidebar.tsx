import { ClipboardCheck, Home, ShoppingCart } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { matchRoutes, useLocation } from "react-router"
import { routes } from '../../routes/routeConfig';
import { HandleRouterType } from "@/@types/generic.types";
import { resolveEnableItem } from "@/helpers/Methods";
import { useAuthContext } from "@/contexts/AuthContext";
import { Link } from "react-router";

export const optionsMenu = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Sacola de compras",
    url: "/sacola-de-compras",
    icon: ShoppingCart,
  },
  {
    title: "Meus pedidos",
    url: "/meus-pedidos",
    icon: ClipboardCheck,
  }
]

export function AppSidebar() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);
  const { user } = useAuthContext();

  if (!matches) return null;

  const getChildrensRoute =matches
    .filter(x => x.route?.path === '/')
    .map(x => x.route.children)[0] ?? [];

  const matchesMapped = getChildrensRoute.map((route) => {
    const handle = route.handle as HandleRouterType;
    
    return {
      title: handle.title, 
      path: handle?.pathDefault ?? route.path,
      enable: resolveEnableItem(handle, user.isMaster), 
      icon: handle.icon
    }
  });

  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {matchesMapped.map((item) => {
                const isActive = window.location.pathname === item.path
                if (item.enable === false) return null; 
                return (
                  <SidebarMenuItem key={item.title} isActive={isActive}>
                    <SidebarMenuButton asChild style={{fontSize: '17px'}}>
                      <Link to={item?.path ?? "/pagina-nao-definida"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
