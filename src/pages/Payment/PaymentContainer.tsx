import { useParams } from 'react-router';
import { Payment } from './Payment'
import { PaymentMethod } from '@/services/Payment/Payment.type';
import { useState } from 'react';
import { useGetOrderByIdQuery } from '@/hooks/Order/useOrderHook';
import { Loader2 } from 'lucide-react';

export const PaymentContainer = () => {
    const { id: orderId } = useParams<{ id: string }>();
    const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId);

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const isLoadingPaymentProcess = false;

    const handlePayment = async () => {
        if (!selectedMethod || !orderId) return;
    };

    const handleRetryPayment = async () => {
        if (!selectedMethod || !orderId) return;

    }

    if (isLoading || !orderData) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

    return (
        <Payment {...{
            handlePayment,
            isLoadingPaymentProcess,
            orderId: orderId!,
            selectedMethod,
            setSelectedMethod,
            orderData,
            handleRetryPayment
        }} />
    )
}
