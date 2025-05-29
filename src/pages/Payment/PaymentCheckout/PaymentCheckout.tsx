import { textFieldIconSx } from '@/@types/generic.types';
import { TextFormField } from '@/components/FormFields/TextFormField';
import { IPay, PaymentMethod } from '@/services/Payment/Payment.type';
import { Calendar, Check, Copy, CreditCard, IdCardIcon, RectangleEllipsis, User } from 'lucide-react';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import moment from 'moment';
import { IOrderReadModel } from '@/services/Order/Order.type';
import { Loading } from '@/components/Loading/Loading';
import { SelectFormField } from '@/components/FormFields/SelectFormField';

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
    return <Loading />

  return (
    <div >
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <TextFormField
            name="cardNumber"
            label="Número do Cartão"
            placeholder="9999 9999 9999 9999"
            mask="card"
            icon={<CreditCard className={textFieldIconSx} />}
          />

          <TextFormField
            name="cardName"
            label="Nome no Cartão"
            placeholder=""
            icon={<IdCardIcon className={textFieldIconSx} />}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextFormField
              name="expiry"
              label="Validade"
              mask='expiry'
              placeholder='00/00'
              icon={<Calendar className={textFieldIconSx} />}
            />

            <TextFormField
              name="cvv"
              label="CVV"
              mask='cvv'
              placeholder='000'
              type='number'
              icon={<RectangleEllipsis className={textFieldIconSx} />}
            />
          </div>

          <SelectFormField
            name="installments"
            label="Quantidade de parcelas"
            placeholder="Selecione..."
            options={[
              { label: "1x", value: "1" },
              { label: "2x", value: "2" },
              { label: "3x", value: "3" },
              { label: "4x", value: "4" },
              { label: "5x", value: "5" },
              { label: "6x", value: "6" }
            ]}
          />

          <TextFormField
            name="identificationNumber"
            label="CPF do titular"
            placeholder="999-999-9999-99"
            mask='cpf'
            icon={<User className={textFieldIconSx} />}
          />
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
        className="w-full bg-orange-500 text-white py-3 px-4 my-7 rounded-lg font-medium hover:bg-orange-600 transition-colors"
      >
        Confirmar Pagamento
      </button>}
    </div>
  )
}
