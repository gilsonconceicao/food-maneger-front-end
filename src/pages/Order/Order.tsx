import { useSidebar } from "@/components/ui/sidebar";
import { formatCurrencyInCents, renderUrlImageValidate } from "@/helpers/Methods";
import { ListPaginatation } from "@/services/@types/generic";
import { OrderStatusEnum } from "@/services/Enums/OrderStatusEnum";
import { IOrderReadModel } from "@/services/Order/Order.type";
import { ArrowLeft, CheckCircle, ChefHat, Clock, Package, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";

const statusConfig: Record<OrderStatusEnum, { icon: React.ReactNode; color: string }> = {
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

const formatRelativeTime = (dateString: string) => {
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


type OrderProps = {
  orderListData: ListPaginatation<IOrderReadModel>;
  refetch: () => void;
}

export const Order = ({ orderListData }: OrderProps) => {
    const { isMobile } = useSidebar();

  const orders = orderListData?.data ?? [];

  const activeOrders = orders.filter(order => ['awaitingpayment', 'inpreparation', 'delivery'].includes(order.status.toLowerCase()));
  const completedOrders = orders.filter(order => ['delivered', 'cancelled'].includes(order.status.toLowerCase()));

  return (
    <div>
      {isMobile && <div className=" shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 ">
            <ArrowLeft className="w-5 h-5" />
            Voltar ao cardápio
          </Link>
        </div>
      </div>}

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Meus Pedidos</h1>

        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Pedidos em andamento</h2>
            <div className="space-y-4">
              {activeOrders.map((order, index) => <OrderItemRender key={index} order={order}/>)}
            </div>
          </div>
        )}

        {completedOrders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Histórico de pedidos</h2>
            <div className="space-y-4">
              {completedOrders.map((order, index) => <OrderItemRender key={index} order={order}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


type OrderItemRenderProps = {
  order: IOrderReadModel;
}

const OrderItemRender = ({order}: OrderItemRenderProps) => {
  const navigate  = useNavigate(); 
  return (
    <div
      key={order.id}
      className="bg-sidebar rounded-lg overflow-hidden border-2 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/pedidos/${order.id}`)}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}>
                {statusConfig[order.status].icon}
                {order.statusDisplay}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Pedido #{order.orderNumber} • {formatRelativeTime(order.createdAt)}
            </p>
          </div>
          <p className="text-lg font-semibold ">
            {formatCurrencyInCents(order?.total ?? 0)}
          </p>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <ul className="divide-y divide-gray-100">
            {order.items.map((item) => {
              const food = item.food;
              const image = renderUrlImageValidate(food.url);
              
              return (
                <li key={item.orderId} className="py-3 flex items-center gap-4">
                  <img
                    src={image}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {food.name}
                    </p>
                    <p className="text-sm text-gray-200 mt-1">
                      {formatCurrencyInCents(item?.price ?? 0)}
                    </p>
                  </div>
                  <p className="text-sm font-medium ">
                    {/* aqui mostra o subtotal */}
                    {formatCurrencyInCents(99)}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}