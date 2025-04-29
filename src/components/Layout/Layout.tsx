import { Outlet } from "react-router";
import { Breadcrumbs } from "../Breadcrumb/Breadcrumb";
import { Header } from "../Header/Header";
import { AppSidebar } from "../Sidebar/AppSidebar";
import { useSidebar } from "../ui/sidebar";


export function Layout() {
  const { isMobile, open } = useSidebar();
  const sidebarWidth = open ? "250px" : "0px";

  if (isMobile) {
    return (
      <div className="w-full">
        <AppSidebar />
        <Header />
        <ShowSidebar />
        <main className="pl-6 pr-6 pt-5">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div
      className="w-full"

      style={{
        display: "grid",
        gridTemplateColumns: `${sidebarWidth} 1fr`,
        transition: "grid-template-columns 0.1s ease-in-out",
      }}
    >
      <aside
        style={{
          backgroundColor: "#0f172a",
          overflow: "hidden",
          transition: "width 0.1s ease-in-out",
        }}
      >
        <AppSidebar />
      </aside>

      <div className="flex flex-col">
        <Header />
        <ShowSidebar />
        <main className="pl-6 pr-6 pt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


const ShowSidebar = () => {
  return (
    <div className="pl-5 pt-2">
      <Breadcrumbs />
    </div>
  )
}