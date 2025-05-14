import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router'

type GoBackProps = {
    text?: string;
    path: string
}

export const GoBack = ({text = 'Voltar', path = '/'}: GoBackProps) => {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate(path)} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            {text}
        </div>
    )
}
