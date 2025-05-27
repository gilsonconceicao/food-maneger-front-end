import { PaymentMethod } from '@/services/Payment/Payment.type';
import { PaymentCheckout } from './PaymentCheckout'
import { useParams } from 'react-router';
import { FormContextProvider } from '@/contexts/FormContext';
import { paymentCheckoutDefaultValues, paymentCheckoutSchemaValidationSchema } from './PaymentCheckoutSchema';
import { FieldValues } from 'react-hook-form';


export const PaymentCheckoutContainer = () => {
  const { method } = useParams();
  const paymentMethod = method as PaymentMethod;

  const onSubmit = (values: FieldValues) => {
    console.log('Form Submitted', values)
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
        />

      </FormContextProvider>
    </div>
  )
}
