import { LucideProps } from "lucide-react";

export type HandleRouterType = {
    breadcrumb: string;
    title: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    enable: boolean;
    isMaster?: boolean
    pathDefault?: string
}

export const textFieldIconSx = "text-gray-400 w-4.5 h-4.5";