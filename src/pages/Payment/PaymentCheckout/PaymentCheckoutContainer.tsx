import { IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { PaymentCheckout } from './PaymentCheckout'
import { useParams } from 'react-router';
import { FormContextProvider } from '@/contexts/FormContext';
import { paymentCheckoutDefaultValues, paymentCheckoutSchemaValidationSchema } from './PaymentCheckoutSchema';
import { FieldValues } from 'react-hook-form';
import { usePaymentByIdQuery } from '@/hooks/Payment/usePayment';


export const PaymentCheckoutContainer = () => {
  const { paymentId } = useParams();
  const paymentMethod = paymentId !== null ? "pix" : "card" as PaymentMethod;

  const { data: paymentData, isLoading: isLoadingPayment } = usePaymentByIdQuery(paymentId);

  const onSubmit = (values: FieldValues) => {
    console.log('Form Submitted', values); 
  }

  return (
    <div>
      <FormContextProvider
        validationSchema={paymentCheckoutSchemaValidationSchema(paymentMethod)}
        defaultValues={paymentCheckoutDefaultValues}
        onSubmit={onSubmit}
      >
        <PaymentCheckout
          paymentMethod={paymentMethod}
          paymentData={paymentData ?? {} as IPay}
          isLoadingPayment={isLoadingPayment}

        />

      </FormContextProvider>
    </div>
  )
}
