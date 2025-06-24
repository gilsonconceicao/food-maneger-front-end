import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { matchRoutes, useLocation } from "react-router"
import { routes } from '../../routes/routeConfig';
import { HandleRouterType } from "@/@types/generic.types";
import { resolveEnableItem } from "@/helpers/Methods";
import { useAuthContext } from "@/contexts/AuthContext";
import { Link } from "react-router";
import { BookOpen } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const matches = matchRoutes(routes, location);
  const { user } = useAuthContext();
  const { isMobile, toggleSidebar } = useSidebar();

  if (!matches || user.isMaster === undefined) return null;

  const getChildrensRoute = matches
    .filter(x => x.route?.path === '/')
    .map(x => x.route.children)[0] ?? [];

  const matchesMapped = getChildrensRoute.map((route) => {
    const handle = route.handle as HandleRouterType;

    return {
      title: handle?.title,
      path: handle?.pathDefault ?? route.path,
      enable: resolveEnableItem(handle, user.isMaster),
      icon: handle.icon
    }
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center ml-2 border-b border-color-border mb-2">
            <BookOpen className='w-4 h-4 mb-1' />
            <SidebarGroupLabel>Menu {isMobile && "| Da Panela Para Mesa"}</SidebarGroupLabel>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {matchesMapped.map((item) => {
                const isActive = window.location.pathname === item.path;
                if (item.enable === false) return null;

                return (
                  <SidebarMenuItem key={item?.title} isActive={isActive} onClick={() => isMobile ? toggleSidebar() : null}>
                    <SidebarMenuButton asChild style={{ fontSize: '17px' }}>
                      <Link to={item?.path ?? "/pagina-nao-definida"}>
                        <item.icon />
                        <span>{item?.title}</span>
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
