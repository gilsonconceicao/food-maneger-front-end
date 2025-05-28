import { textFieldIconSx } from '@/@types/generic.types';
import { TextFormField } from '@/components/FormFields/TextFormField';
import { IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { Check, Copy, IdCardIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import moment from 'moment';
import { IOrderReadModel } from '@/services/Order/Order.type';


type PaymentCheckoutProps = {
  paymentMethod: PaymentMethod;
  paymentData: IPay;
  isLoadingPayment: boolean;
  isLoadingOrder: boolean;
  orderData: IOrderReadModel | undefined
}

export const PaymentCheckout = ({ paymentMethod, paymentData, isLoadingPayment, isLoadingOrder }: PaymentCheckoutProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(paymentData!.qrCode!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  if (isLoadingPayment || isLoadingOrder)
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;

  return (
    <div >
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
            {paymentData?.qrCode !== undefined && paymentData?.qrCode !== null &&
              <div style={{
                background: 'white',
                padding: 10,
                borderRadius: '10px',
              }}>
                <QRCodeCanvas
                  value={paymentData?.qrCode}
                  size={200}
                  id='qr-gen'
                  level="H"
                />
              </div>}
          </div>

          <p className="scroll-m-20 text-md font-semibold tracking-tight text-center">
            Pagamento expira às {moment(paymentData.expirationDateTo).format("LT")}
          </p>

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
              {paymentData?.qrCode ?? ""}
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

      {paymentMethod === 'card' && <button
        type='submit'
        className="w-full bg-orange-500 text-white py-3 px-4 my-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
      >
        Confirmar Pagamento
      </button>}
    </div>
  )
}
