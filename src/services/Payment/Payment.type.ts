import { IOrder } from "../Order/Order.type";

export type PaymentMethod =
  | 'card'
  | 'pix'


export interface IPay {
  id: string;
  orderId: string; 
  order: IOrder;
  description: string;
  status: string;
  paymentTypeId: string;
  paymentMethodId: string;
  currencyId: string;
  installments?: number; 
  transactionAmount?: number; 
  externalReference: string;
  notificationUrl: string;
  dateCreated: string; 
  dateLastUpdated: string;
  expirationDateTo: string;
  qrCode: string;
  qrCodeBase64: string;
  collectorId: number; 
  issuerId: string;
}
export interface ICreatePayment {
  orderId: string,
  paymentMethod: "Pix" | "Card",
  installments?: number,
  card?: ICard
}

interface ICard
{
  cardNumber: string;
  cardHolderNamenoCartão: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string; 
}