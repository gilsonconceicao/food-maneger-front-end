import React from 'react';
import { CreditCard, QrCode, Wallet, Loader2 } from 'lucide-react';
import { PaymentMethod } from '@/services/Payment/Payment.type';
import { GoBack } from '@/components/GoBack/GoBack';

const paymentMethods: { id: PaymentMethod; title: string; icon: React.ReactNode; description: string }[] = [
    {
        id: 'credit_card',
        title: 'Cartão de Crédito',
        icon: <CreditCard className="w-6 h-6" />,
        description: 'Pague em até 12x'
    },
    {
        id: 'pix',
        title: 'PIX',
        icon: <QrCode className="w-6 h-6" />,
        description: 'Pagamento instantâneo'
    },
    {
        id: 'debit_card',
        title: 'Cartão de Débito',
        icon: <Wallet className="w-6 h-6" />,
        description: 'Débito à vista'
    }
];

interface PaymentProps {
    orderId: string;
    handlePayment: () => void;
    setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
    selectedMethod: PaymentMethod | null; 
    isLoadingPaymentProcess: boolean;
}

export const Payment = (props: PaymentProps) => {
    const { handlePayment, orderId, selectedMethod, setSelectedMethod, isLoadingPaymentProcess } = props;
    return (
        <div className="min-h-screen">
            <div className=" max-w-2xl mx-auto p-4">
                <GoBack text='Voltar para o pedido' path={`/pedidos/${orderId}`} />
                <div className="bg-sidebar rounded-lg shadow-sm p-6 mt-4">
                    <h1 className="text-2xl font-bold mb-6">
                        Escolha a forma de pagamento
                    </h1>

                    <div className="space-y-4">
                        {paymentMethods.map((method) => {
                            const itemSelected = selectedMethod === method.id;
                            return (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-colors cursor-pointer translate-3d 
                                        ${itemSelected ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                                >
                                    <div className={`p-3 rounded-full ${itemSelected ? 'bg-orange-100 text-orange-500' : 'bg-gray-100 text-gray-500'}`}>
                                        {method.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className={`font-medium ${itemSelected ? 'text-orange-500' : 'text-white'}`}>{method.title}</h3>
                                        <p className="text-sm text-gray-500">{method.description}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={!selectedMethod}
                        className="mt-8 w-full bg-orange-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoadingPaymentProcess ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            'Continuar para pagamento'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;