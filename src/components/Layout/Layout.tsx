import { AppSidebar } from "../Sidebar/app-sidebar";
import { useSidebar } from "../ui/sidebar";

type LayoutProps = {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const { open } = useSidebar();
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `${open ? '250px' : '0px'} 1fr`,
                width: "100vw", 
                transition: "grid-template-columns 0.3s ease-in-out",
            }}
        >
            <aside style={{ backgroundColor: "#0f172a" }}>
                <AppSidebar />
            </aside>
            <main style={{ padding: "1rem" }}>
                {children}
            </main>
        </div>
    );
}
