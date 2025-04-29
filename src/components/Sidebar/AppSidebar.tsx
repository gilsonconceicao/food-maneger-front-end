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

// Menu items.
// eslint-disable-next-line react-refresh/only-export-components
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {optionsMenu.map((item) => {
                const isActive = window.location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title} isActive={isActive}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
