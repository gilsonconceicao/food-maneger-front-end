export enum OrderStatusEnum {
    Created = 'Created',                      
    Requested = 'Requested',                 
    AwaitingConfirmation = 'AwaitingConfirmation',
    InPreparation = 'InPreparation',        
    Done = 'Done',                            
    Finished = 'Finished',                    
    Canceled = 'Canceled'                    
  }
  
  export const OrderStatusDescriptions: Record<OrderStatusEnum, string> = {
    [OrderStatusEnum.Created]: "Criado",
    [OrderStatusEnum.Requested]: "Solicitado",
    [OrderStatusEnum.AwaitingConfirmation]: "Aguardando confirmação",
    [OrderStatusEnum.InPreparation]: "Em preparo",
    [OrderStatusEnum.Done]: "Pronto",
    [OrderStatusEnum.Finished]: "Finalizado",
    [OrderStatusEnum.Canceled]: "Cancelado"
  };
  