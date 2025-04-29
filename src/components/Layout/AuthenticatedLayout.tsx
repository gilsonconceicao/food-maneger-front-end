import { ReactNode } from 'react'

export const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen w-full ">
            {children}
        </div>
    )
}
