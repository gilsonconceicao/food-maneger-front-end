import { OrderStatusEnum } from "@/services/Enums/OrderStatusEnum";
import { AlertTriangle, CheckCircle, CheckSquare, Clock, DollarSign, Hourglass, Package, Wallet, XCircle } from "lucide-react";

export const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  AwaitingPayment: {
    icon: <Wallet className="w-5 h-5" />,
    color: 'text-purple-500 bg-purple-50'
  },
  InPreparation: {
    icon: <Clock className="w-5 h-5" />,
    color: 'text-blue-500 bg-blue-50'
  },
  Done: {
    icon: <Package className="w-5 h-5" />,
    color: 'text-yellow-500 bg-yellow-50'
  },
  Delivery: {
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-emerald-500 bg-emerald-50'
  },
  Cancelled: {
    icon: <XCircle className="w-5 h-5" />,
    color: 'text-red-500 bg-red-50'
  },
  [OrderStatusEnum.Paid]: {
    icon: <DollarSign className="w-5 h-5" />,
    color: 'text-green-600 bg-green-50'
  },
  [OrderStatusEnum.Finished]: {
    icon: <CheckSquare className="w-5 h-5" />,
    color: 'text-indigo-600 bg-indigo-50'
  },
  [OrderStatusEnum.PaymentFailed]: {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'text-orange-600 bg-orange-50'
  },
  [OrderStatusEnum.Expired]: {
    icon: <Hourglass className="w-5 h-5" />,
    color: 'text-gray-500 bg-gray-100'
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
