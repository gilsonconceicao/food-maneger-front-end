export enum OrderStatusEnum {
  AwaitingPayment = 'AwaitingPayment',         // Aguardando pagamento
  Paid = 'Paid',                               // Pago
  InPreparation = 'InPreparation',             // Em preparo
  Done = 'Done',                               // Pronto
  Delivery = 'Delivery',                       // Enviando
  Finished = 'Finished',                       // Finalizado
  Cancelled = 'Cancelled',                       // Cancelado
  PaymentFailed = 'PaymentFailed',             // Falha no pagamento
  Expired = 'Expired'                          // Pagamento expirado
}
