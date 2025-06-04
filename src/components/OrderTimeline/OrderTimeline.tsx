import React from 'react';
import { Clock, Package, CheckCircle, XCircle, Wallet, Truck, DollarSign } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
}

const timelineSteps: { status: string; label: string; icon: React.ReactNode, desrcription?: string }[] = [
  {
    status: 'AwaitingPayment',
    label: 'Aguardando pagamento',
    icon: <Wallet className="w-5 h-5" />, 
    desrcription: "Aguardando confirmação do pagamento."
  },
  {
    status: 'Paid',
    label: 'Pago',
    icon: <DollarSign className="w-5 h-5" />, 
    desrcription: "Pedido foi pago e está sendo processado."
  },
  {
    status: 'InPreparation',
    label: 'Em preparo',
    icon: <Clock className="w-5 h-5" />, 
    desrcription: "Seu pedido está sendo preparando com carinho."
  },
  {
    status: 'Done',
    label: 'Pronto',
    icon: <Package className="w-5 h-5" />, 
    desrcription: "Seu pedido está pronto. Estamos organizando o envio, por favor, aguarde."
  },
  {
    status: 'Delivery',
    label: 'Enviando',
    icon: <Truck className="w-5 h-5" />, 
    desrcription: "Seu pedido está a caminho."
  }, 
  {
    status: 'Finished',
    label: 'Finalizado',
    icon: <CheckCircle className="w-5 h-5" />, 
    desrcription: "Pedido finalizado com sucesso."
  }, 
];

const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  if (status === 'Cancelled') {
    return (
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-full">
          <XCircle className="w-6 h-6 text-red-500" />
        </div>
        <div>
          <h3 className="font-medium text-red-700">Pedido cancelado</h3>
          <p className="text-sm text-red-600">Este pedido foi cancelado e não pode mais ser processado.</p>
        </div>
      </div>
    );
  }

  const currentStepIndex = timelineSteps.findIndex(step => step.status === status);

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
      
      {timelineSteps.map((step, index) => {
        const isCompleted = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;
        
        return (
          <div key={step.status} className="relative flex items-start gap-4 pb-8 last:pb-0">
            <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-2 transition-colors ${
              isCompleted
                ? 'bg-orange-50 border-orange-500'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`${isCompleted ? 'text-orange-500' : 'text-gray-400'}`}>
                {step.icon}
              </div>
            </div>
            
            <div className="flex-1 pt-3">
              <h3 className={`font-medium ${!isCurrent && 'mt-2'} ${
                isCurrent ? 'text-orange-500' : isCompleted ? 'text-orange-500' : 'text-gray-500'
              }`}>
                {step.label}
              </h3>
              {isCurrent && (
                <p className="text-sm text-gray-600 mt-1">
                  {step.desrcription}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;