// enums/OrderStatus.ts
export enum OrderStatusEnum {
    Created = 'Created',                      // Criado
    Requested = 'Requested',                  // Solicitado
    AwaitingConfirmation = 'AwaitingConfirmation', // Aguardando confirmação
    InPreparation = 'InPreparation',          // Em preparo
    Done = 'Done',                            // Pronto
    Finished = 'Finished',                    // Finalizado
    Canceled = 'Canceled'                     // Cancelado
  }
  
  // Mapeamento para as descrições em português
  export const OrderStatusDescriptions: Record<OrderStatusEnum, string> = {
    [OrderStatusEnum.Created]: "Criado",
    [OrderStatusEnum.Requested]: "Solicitado",
    [OrderStatusEnum.AwaitingConfirmation]: "Aguardando confirmação",
    [OrderStatusEnum.InPreparation]: "Em preparo",
    [OrderStatusEnum.Done]: "Pronto",
    [OrderStatusEnum.Finished]: "Finalizado",
    [OrderStatusEnum.Canceled]: "Cancelado"
  };
  