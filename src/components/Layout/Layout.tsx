import { Outlet } from "react-router";
import { Header } from "../Header/Header";
import { AppSidebar } from "../Sidebar/AppSidebar";
import { useSidebar } from "../ui/sidebar";
import { useAuthContext } from "@/contexts/AuthContext";

export function Layout() {
  const { isMobile } = useSidebar();
  const { isAuthenticated } = useAuthContext();
  const sidebarWidth = "250px";

  if (!isAuthenticated) {
    return (
      <div className="w-full">
        <Header />
        <main className="bg-background pl-6 pr-6 pt-15">
          <Outlet />
        </main>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full">
        <AppSidebar />
        <Header />
        <div className="h-20" />
        <main className="pl-3 pr-3">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <aside
        style={{
          width: sidebarWidth,
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <AppSidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="pl-6 pr-6 pt-2 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}