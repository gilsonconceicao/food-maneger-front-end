import { useLocation, useNavigate, useParams } from 'react-router';

import { ICreatePayment, IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { useCreatePaymentMutate, usePaymentByIdQuery } from '@/hooks/Payment/usePayment';
import { useGetOrderByIdQuery } from '@/hooks/Order/useOrderHook';
import { PaymentCheckout } from './PaymentCheckout';
import { FieldValues } from 'react-hook-form';
import { GoBack } from '@/components/GoBack/GoBack';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { Loading } from '@/components/Loading/Loading';
import toast from 'react-hot-toast';
import { FormContextProvider } from '@/contexts/FormContext';
import { paymentCheckoutDefaultValues, paymentCheckoutSchemaValidationSchema } from './PaymentCheckoutSchema';

export const PaymentCheckoutContainer = () => {
  const { paymentId, id: orderId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const paymentMethod = (pathname.includes('/pagamento/card') ? 'card' : 'pix') as PaymentMethod;

  const { data: orderData, isLoading: isLoadingOrder } = useGetOrderByIdQuery(orderId);
  const { data: paymentData, isLoading: isLoadingPayment } = usePaymentByIdQuery(paymentId);
  const { mutateAsync: createPaymentAsync, isPending: isLoadingCreatePayment } = useCreatePaymentMutate(() => {
    toast.success("Pagamento com cartão foi concluído com sucesso.");
    navigate(-2);
  });

  console.log(isLoadingCreatePayment)

  const handleSubmitCard = async (data: FieldValues) => {
    const payload = {
      orderId: orderId!,
      paymentMethod: "Card",
      installments: Number(data?.installments),
      card: {
        cardHolderNamenoCartão: data?.cardName,
        //@ts-ignore
        cardNumber: String(data?.cardNumber).replaceAll(" ", "").trim(),
        cvv: data?.cvv,
        expirationMonth: String(data?.expiry).replace('/', '').slice(0, 2),
        expirationYear: `20${String(data?.expiry).replace('/', '').slice(2)}`,
      }
    } as ICreatePayment;

    await createPaymentAsync(payload);
};

if (isLoadingOrder || isLoadingPayment) {
  return <Loading />
}


return (
  <FormContextProvider
    validationSchema={paymentCheckoutSchemaValidationSchema(paymentMethod)}
    defaultValues={paymentCheckoutDefaultValues}
    onSubmit={handleSubmitCard}
  >
    <div className="min-h-screen">
      <div className='max-w-2xl mx-auto p-4'>
        <GoBack text='Ver pedido' path={`/pedidos/${orderData?.id}`} />
        <div className="bg-sidebar rounded-lg shadow-sm p-6 mt-4 space-y-3">
          <div className='space-y-1'>
            <h1 className="text-2xl font-bold">
              {paymentMethod === 'card' ? "Pagamento" : "Pagamento via Pix"}
            </h1>
            <p className="leading-7 text-gray-300">Total a pagar: {formatCurrencyInCents(orderData?.totalValue ?? 0)}</p>
          </div>

          <PaymentCheckout
            paymentMethod={paymentMethod}
            paymentData={paymentData ?? ({} as IPay)}
            isLoadingPayment={isLoadingPayment}
            orderData={orderData}
            isLoadingOrder={isLoadingOrder}
          />
        </div >
      </div>
    </div>
  </FormContextProvider>
);
};
