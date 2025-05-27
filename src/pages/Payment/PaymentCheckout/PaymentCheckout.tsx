import { textFieldIconSx } from '@/@types/generic.types';
import { TextFormField } from '@/components/FormFields/TextFormField';
import { GoBack } from '@/components/GoBack/GoBack';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { useGetOrderByIdQuery } from '@/hooks/Order/useOrderHook';
import { PaymentMethod } from '@/services/Payment/Payment.type';
import { Check, Copy, IdCardIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

type PaymentCheckoutProps = {
  paymentMethod: PaymentMethod;
}

export const PaymentCheckout = ({ paymentMethod }: PaymentCheckoutProps) => {
  const { id: orderId } = useParams();
    const [copied, setCopied] = useState(false);


  const { data: orderData } = useGetOrderByIdQuery(orderId);

 const handleCopyPix = () => {
    navigator.clipboard.writeText("");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const paymentMethodDisplay = paymentMethod === 'card' ? 'Cartão de Crédito/Débito' : 'PIX';

  return (
    <div className="min-h-screen">
      <div className='max-w-2xl mx-auto p-4'>
        <GoBack text='Escolher outro método de pagamento' path={`/pedidos/${orderId}/pagamento`} />
        <div className="bg-sidebar rounded-lg shadow-sm p-6 mt-4 space-y-3">

          <div className='space-y-1'>
            <h1 className="text-2xl font-bold">
              Pagamento via {paymentMethodDisplay}
            </h1>
            <p className="leading-7 text-gray-300">Total a pagar: {formatCurrencyInCents(orderData?.totalValue ?? 0)}</p>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <TextFormField
                  name="cardNumber"
                  label="Número do Cartão"
                  placeholder="9999 9999 9999 9999"
                  mask="card"
                  icon={<IdCardIcon className={textFieldIconSx} />}
                />

              </div>

              <div>
                <TextFormField
                  name="cardName"
                  label="Nome no Cartão"
                  placeholder="9999 9999 9999 9999"
                  icon={<IdCardIcon className={textFieldIconSx} />}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <TextFormField
                    name="expiry"
                    label="Validade"
                    mask='expiry'
                    icon={<IdCardIcon className={textFieldIconSx} />}
                  />
                </div>

                <div>
                  <TextFormField
                    name="cvv"
                    label="CVV"
                    mask='cvv'
                    type='number'
                    icon={<IdCardIcon className={textFieldIconSx} />}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'pix' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
                  alt="QR Code"
                  className="w-64 h-64 object-cover"
                />
              </div>

              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Código PIX</span>
                  <button
                    onClick={handleCopyPix}
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar código
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm font-mono bg-gray-700 p-2 rounded border border-gray-800 break-all">
                  {"mockPixCode1234567890abcdefg"}
                </p>
              </div>

              <div className="bg-gray-700 border  rounded-lg p-4 text-sm font-bold">
                <p>
                  1. Abra o app do seu banco ou carteira digital
                  <br />
                  2. Escolha pagar via PIX com QR Code
                  <br />
                  3. Escaneie o código ou cole o código PIX
                  <br />
                  4. Confirme as informações e finalize o pagamento
                </p>
              </div>
            </div>
          )}

          <button
type='submit'
className="w-full bg-orange-500 text-white py-3 px-4 my-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </div>
  )
}
