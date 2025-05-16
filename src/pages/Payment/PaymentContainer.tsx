import { useParams } from 'react-router';
import { Payment } from './Payment'
import { PaymentMethod } from '@/services/Payment/Payment.type';
import { useState } from 'react';

export const PaymentContainer = () => {
    const { id: orderId } = useParams<{ id: string }>();

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const isLoadingPaymentProcess = false;

    const handlePayment = async () => {
        if (!selectedMethod || !orderId) return;

    };

    return (
        <Payment {...{
            handlePayment, 
            isLoadingPaymentProcess,
            orderId: orderId!, 
            selectedMethod, 
            setSelectedMethod
        }}/>
    )
}
