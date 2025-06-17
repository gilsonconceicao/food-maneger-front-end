import React from 'react';
import { QrCode } from 'lucide-react';
import { IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { GoBack } from '@/components/GoBack/GoBack';
import { IOrderReadModel } from '@/services/Order/Order.type';
import { formatCurrencyInCents } from '@/helpers/Methods';

const paymentMethods: { id: PaymentMethod; title: string; icon: React.ReactNode; description: string }[] = [
    // {
    //     id: 'card',
    //     title: 'Cartão de Débito/Crédito',
    //     icon: <CreditCard className="w-6 h-6" />,
    //     description: 'Pague em até 12x'
    // },
    {
        id: 'pix',
        title: 'PIX',
        icon: <QrCode className="w-6 h-6" />,
        description: 'Pagamento instantâneo'
    }
];

interface PaymentProps {
    orderId: string;
    handlePayment: () => void;
    handleRetryPayment: () => void;
    setSelectedMethod: React.Dispatch<React.SetStateAction<PaymentMethod | null>>;
    selectedMethod: PaymentMethod | null;
    orderData: IOrderReadModel;
    isLoading: boolean;
    paymentData?: IPay
}

export const SelectPaymentMethod = (props: PaymentProps) => {
    const { handlePayment, orderId, selectedMethod, setSelectedMethod, orderData, isLoading } = props;

    return (
        <div className="min-h-screen">
            <div className=" max-w-2xl mx-auto p-4">
                <GoBack text='Voltar para o pedido' path={`/pedidos/${orderId}`} />
                <div className="bg-sidebar rounded-lg shadow-sm p-6 mt-4 space-y-3">
                    <div className='space-y-1'>
                        <h1 className="text-2xl font-bold">
                            Escolha a forma de pagamento
                        </h1>
                        <p className="leading-7">Total a pagar: {formatCurrencyInCents(orderData?.totalValue)}</p>
                    </div>

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

                    {selectedMethod && (
                        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Como funciona o pagamento</h3>
                            {selectedMethod === "pix" ? (
                                <p className="text-sm text-gray-300">
                                    Ao escolher <strong>PIX</strong>, um <strong>QR Code</strong> será gerado.
                                    Escaneie com o app do seu banco para realizar o pagamento instantâneo de forma simples e segura.
                                </p>
                            ) : (
                                <p className="text-sm text-gray-300">
                                    Ao escolher <strong>Cartão de Crédito</strong>, preencha os dados do seu cartão
                                    (número, validade, CVV e nome do titular) para concluir o pagamento.
                                </p>
                            )}
                            <p className="text-sm text-gray-300 mt-2">
                                Assim que o pagamento for confirmado, seu pedido será processado automaticamente.
                            </p>
                        </div>
                    )}



                    <button
                        onClick={handlePayment}
                        disabled={!selectedMethod || isLoading}
                        className="mt-8 w-full bg-orange-500 text-white py-3 px-4 cursor-pointer rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        Continuar para pagamento
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectPaymentMethod;