import { LucideProps } from "lucide-react";

export type HandleRouterType = {
    breadcrumb: string;
    title: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    enable: boolean;
    isMaster?: boolean
    pathDefault?: string
}