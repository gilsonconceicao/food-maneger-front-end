import React from 'react';
import { Lock, UserRound, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AuthPromptProps {
    onClose: () => void;
    action?: string;
    show: boolean;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ onClose, action = 'continuar', show}) => {
    const navigate = useNavigate();

    if (!show) return null; 

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fade-in">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={onClose}
                        className="text-white text-2xl hover:text-gray-600 transition-colors"
                    >
                        <span className="sr-only">Fechar</span>
                        ×
                    </button>
                </div>

                <div className="text-center mb-6">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-orange-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        Faça login para {action}
                    </h2>
                    <p className="text-gray-300">
                        Para aproveitar todos os recursos e ter uma experiência personalizada, faça login ou crie uma conta.
                    </p>
                </div>

                <div className="space-y-4 mb-6">
                    <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => navigate('/login')}>
                        <UserRound className="w-5 h-5" />
                        Entrar
                    </button>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-sm ">
                        Não tem uma conta ainda?{' '}
                        <button className="text-orange-500 font-medium hover:text-orange-600 inline-flex items-center gap-1" onClick={() => navigate('/cadastro')}>
                            Criar conta
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPrompt;