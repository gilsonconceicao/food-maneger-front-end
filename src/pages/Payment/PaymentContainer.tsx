import { useNavigate, useParams } from 'react-router';
import { Payment } from './Payment'
import { IPreference, PaymentMethod } from '@/services/Payment/Payment.type';
import { useState } from 'react';
import { useGetOrderByIdQuery } from '@/hooks/Order/useOrderHook';
import { Loader2 } from 'lucide-react';
import { getPreferencePaymentById } from '@/services/Payment';

export const PaymentContainer = () => {
    const { id: orderId } = useParams<{ id: string }>();
    const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId);
    const navigate = useNavigate()

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const isLoadingPaymentProcess = false;

    const handlePayment = async () => {
        if (!selectedMethod || !orderId) return;
        
    };

    const handleRetryPayment = async () => {
        if (!orderData) return;
        const preferenceId = orderData?.externalPaymentId;
        try {
            const { data } = await getPreferencePaymentById(preferenceId);
            const preference = data as IPreference;
            window.open(preference.initPoint, '_blank');
            navigate(-1);
        } catch (error) {
            console.error('Error retrying payment:', error);
        }
    }

    if (isLoading || !orderData)
        return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

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
