import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router'
import { Button } from '../ui/button';

type GoBackProps = {
    text?: string;
    path?: string
}

export const GoBack = ({ text = 'Voltar', path }: GoBackProps) => {
    const navigate = useNavigate();

    function handleGoBack() {
        if (window.history.length > 2) {
            navigate(-1);
        } else if (path) {
            navigate(path);
        }
    }

    return (
        <Button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 "
            variant='outline'
            type='button'
        >
            <ArrowLeft className="w-5 h-5" />
            {text}
        </Button>
    )
}
