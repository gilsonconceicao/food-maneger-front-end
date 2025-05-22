export type PaymentMethod =
  | 'credit_card'
  | 'pix'
  | 'debit_card';


export interface IPreference {
  id: string;
  items: IPreferenceItem[];
  payer: IPreferencePayer;
  notificationUrl: string;
  statementDescriptor: string;
  externalReference: string;
  expires?: boolean;
  dateOfExpiration?: Date;
  expirationDateFrom?: Date;
  expirationDateTo?: Date;
  collectorId?: number;
  marketplace: string;
  marketplaceFee?: number;
  purpose: string;
  additionalInfo: string;
  autoReturn: string;
  sponsorId?: number;
  processingModes: string[];
  binaryMode?: boolean;
  initPoint: string;
  sandboxInitPoint: string;
  dateCreated?: Date;
}

export interface IPreferencePayer {
  name: string;
  surname: string;
  email: string;
  phone: string; 
  address: object;
  dateCreated?: Date;
  authenticationType: string;
  isPrimeUser?: boolean;
  isFirstPurchaseOnline?: boolean;
  lastPurchase?: Date;
}

export interface IPreferenceItem {
  id: string;
  title: string;
  description: string;
  pictureUrl: string;
  categoryId: string;
  quantity?: number;
  unitPrice?: number;
  currencyId: string;
  warranty?: boolean;
  eventDate?: Date;
}