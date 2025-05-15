import { OrderStatusEnum } from "@/services/Enums/OrderStatusEnum";
import { CheckCircle, ChefHat, Clock, Package, XCircle } from "lucide-react";

export const statusConfig: Record<OrderStatusEnum, { icon: React.ReactNode; color: string }> = {
  AwaitingPayment: {
    icon: <Clock className="w-5 h-5" />,
    color: 'text-blue-500 bg-blue-50'
  },
  InPreparation: {
    icon: <ChefHat className="w-5 h-5" />,
    color: 'text-yellow-500 bg-yellow-50'
  },
  Done: {
    icon: <Package className="w-5 h-5" />,
    color: 'text-emerald-500 bg-emerald-50'
  },
  Delivery: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-gray-500 bg-gray-50'
  },
  Cancelled: {
    icon: <XCircle className="w-5 h-5" />,
    color: 'text-red-500 bg-red-50'
  },
  [OrderStatusEnum.Paid]: {
    icon: undefined,
    color: ""
  },
  [OrderStatusEnum.Finished]: {
    icon: undefined,
    color: ""
  },
  [OrderStatusEnum.PaymentFailed]: {
    icon: undefined,
    color: ""
  },
  [OrderStatusEnum.Expired]: {
    icon: undefined,
    color: ""
  }
};

export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 1) return 'Agora mesmo';
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h atrás`;
  }
  return date.toLocaleDateString('pt-BR');
};
