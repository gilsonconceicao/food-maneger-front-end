import { formatCurrencyInCents, renderUrlImageValidate } from "@/helpers/Methods";
import { ListPaginatation } from "@/services/@types/generic";
import { IOrderReadModel } from "@/services/Order/Order.type";
import { statusConfig } from "./OrderGeneric";
import { useNavigate } from "react-router";
import { GoBack } from "@/components/GoBack/GoBack";
import moment from "moment"
import { ChevronLeft, ChevronRight } from "lucide-react";

type OrderProps = {
  orderListData: ListPaginatation<IOrderReadModel>;
  refetch: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number;
}

export const Order = ({ orderListData, setPage, page }: OrderProps) => {
  const orders = orderListData?.data ?? [];

  const activeOrders = orders.filter(order => ['awaitingpayment', 'inpreparation', 'delivery', 'paid', 'done'].includes(order.status.toLowerCase()));
  const completedOrders = orders.filter(order => ['finished', 'cancelled'].includes(order.status.toLowerCase()));
  const expiredOrders = orders.filter(order => ['expired', 'paymentfailed'].includes(order.status.toLowerCase()));

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4">
      <GoBack path="/" />

      <div className="pb-4 border-b border-color-border">
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <p className="leading-7">
          Confira a sua lista de pedidos, podendo visualizar os que estão em andamento ou finalizados.
        </p>
      </div>

      {activeOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Pedidos em andamento</h2>
          <div className="space-y-4">
            {activeOrders.map((order, index) => <OrderItemRender key={index} order={order} />)}
          </div>
        </div>
      )}

      {expiredOrders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Pedidos expirados</h2>
          <div className="space-y-4">
            {expiredOrders.map((order, index) => <OrderItemRender key={index} order={order} />)}
          </div>
        </div>
      )}

      {completedOrders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Histórico de pedidos</h2>
          <div className="space-y-4">
            {completedOrders.map((order, index) => <OrderItemRender key={index} order={order} />)}
          </div>
        </div>
      )}

      {orders.length > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(prev => prev - 1)}
            disabled={page === 0}
            className="p-2 rounded-lg border border-color-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h3 className="pnpm dlx shadcn@latest add typography">
            {page + 1}
          </h3>

          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={page === orderListData.totalPages - 1}
            className="p-2 rounded-lg border border-color-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

type OrderItemRenderProps = {
  order: IOrderReadModel;
}

const OrderItemRender = ({ order }: OrderItemRenderProps) => {
  const navigate = useNavigate();
  const isGeneratedExternalPayment = order.status === 'AwaitingPayment' && order.paymentId !== null;

  const statusDisplay = isGeneratedExternalPayment ? "Concluir pagamento" : order.statusDisplay;
  const color = isGeneratedExternalPayment ? "text-orange-600 bg-orange-200" : statusConfig[order.status].color;

  return (
    <div
      key={order.id}
      className="bg-orderCard rounded-lg overflow-hidden border-2 hover:shadow-md transition-shadow cursor-pointer "
      onClick={() => navigate(`/pedidos/${order.id}`)}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-sm font-medium ${color}`}>
                {statusConfig[order.status].icon}
                {statusDisplay}
              </span>
            </div>
          </div>
          <p className="text-lg font-semibold text-orange-200">
            {formatCurrencyInCents(order?.totalValue ?? 0)}
          </p>
        </div>

        <div style={{ marginTop: -10, marginBottom: 10 }} className="flex flex-wrap items-center justify-between">
          <p className="text-sm text-gray-500 mt-2">
            Número do pedido #{order.orderNumber} • {moment(order.createdAt).calendar()}
          </p>
          <p className="text-sm text-gray-500 mt-2">{order?.items?.length ?? 0} {order?.items?.length > 1 ? 'itens' : 'item'}</p>
        </div>

        <div className="border-t border-color-border pt-4">
          <ul className="divide-y border-color-border">
            {order.items.map((item) => {
              const food = item.food;
              const image = renderUrlImageValidate(food.url);

              return (
                <li key={item.orderId} className="py-3 flex items-center gap-4">
                  <img
                    src={image}
                    alt={food.name}
                    className="w-13 h-13 object-cover rounded-lg "
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate gap-2.5">
                      {food.name}
                      <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {item.quantity}x
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.food.categoryDisplay}
                    </p>
                  </div>
                  <p className="text-sm font-medium ">
                    {formatCurrencyInCents((item.price ?? 0) * (item?.quantity ?? 0))}
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