import { useNavigate, useParams } from 'react-router';
import { SelectPaymentMethod } from './SelectPaymentMethod'
import { IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { useState } from 'react';
import { useGetOrderByIdQuery } from '@/hooks/Order/useOrderHook';
import { Loader2 } from 'lucide-react';
import { useCreatePaymentMutate, usePaymentByIdQuery } from '@/hooks/Payment/usePayment';

export const SelectPaymentMethodContainer = () => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const { id: orderId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId);
    const { data: paymentData } = usePaymentByIdQuery(orderData?.paymentId);

    const redirectPixPayment = (pay: IPay) => navigate(`/pedidos/${orderId}/pagamento/pix/${pay.id}`); 
    const { mutateAsync: createPaymentAsync, isPending: isLoadingCreatePayment } = useCreatePaymentMutate(redirectPixPayment); 

    const handlePayment = async () => {
        if (!selectedMethod || !orderId) return;

        if (selectedMethod === "pix") {
            await createPaymentAsync({
                orderId: orderId,
                paymentMethod: "Pix"
            });
        } else {
            return navigate(`/pedidos/${orderId}/pagamento/card`);
        }
    };

    const handleRetryPayment = async () => {
        if (paymentData !== null && paymentData !== undefined) {
            return redirectPixPayment(paymentData); 
        }
    }

    if (isLoading || !orderData)
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

    return (
        <SelectPaymentMethod {...{
            handlePayment,
            orderId: orderId!,
            selectedMethod,
            setSelectedMethod,
            orderData,
            handleRetryPayment,
            isLoading: isLoadingCreatePayment,
            paymentData
        }} />
    )
}
