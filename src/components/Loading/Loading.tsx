import { Loader2 } from 'lucide-react'

export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-100">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
    )
}
