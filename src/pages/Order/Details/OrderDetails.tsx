import { IOrderReadModel } from "@/services/Order/Order.type"
import { CalendarClock, Receipt, Wallet } from "lucide-react"
import { statusConfig } from "../OrderGeneric"
import { formatCurrencyInCents, renderUrlImageValidate } from "@/helpers/Methods"
import { GoBack } from "@/components/GoBack/GoBack"
import { useNavigate } from "react-router"

type OrderDataType = {
    order: IOrderReadModel
}

export const OrderDetails = ({ order }: OrderDataType) => {
    const navigate = useNavigate(); 

    const createdAtFormted = formatDate(order.createdAt);
    const updatedAtFormated = formatDate(order.updatedAt);

    const isAwaitPayment = order.status === 'AwaitingPayment'; 

    return (
        <div className="space-y-4 max-w-4xl mx-auto p-4">
            <GoBack path="/pedidos" />
            <h1 className="text-3xl font-bold">Pedido #{order.orderNumber}</h1>

            <div className="bg-sidebar rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig[order.status].color}`}>
                                {statusConfig[order.status].icon}
                                {order.statusDisplay}
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold ">
                                {formatCurrencyInCents(order.totalValue ?? 0)}
                            </div>
                        </div>
                    </div>

                    {isAwaitPayment && (
                        <div className="mb-6">
                            <button
                                onClick={() => navigate(`/pedidos/${order.id}/pagamento`)}
                                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Wallet className="w-5 h-5" />
                                Realizar pagamento
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-gray-700 rounded-lg">
                            <CalendarClock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-50">Data do pedido</p>
                                <p className="text-sm text-gray-400">{createdAtFormted}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-gray-700 rounded-lg">
                            <Receipt className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-50">Última atualização</p>
                                <p className="text-sm text-gray-400">{updatedAtFormated === '01/01/1, 00:00' ? createdAtFormted : updatedAtFormated}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6">
                        <h2 className="text-lg font-semibold  mb-4">Itens do pedido</h2>

                        <ul className="divide-y divide-gray-800">
                            {order.items.map((item, index) => {
                                return (
                                    <li key={index} className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={renderUrlImageValidate(item.food.url)}
                                                alt={item.food.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium ">{item.food.name}</p>
                                                <div className="mt-1 flex items-center gap-4">
                                                    {/* <p className="text-sm text-gray-500">
                                                            {order?.numberOfInstallments} 
                                                        </p> */}
                                                    <p className="text-sm font-medium ">
                                                        {formatCurrencyInCents(item?.price ?? 0)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>

                    <div className="border-t border-gray-800 mt-6 pt-6">
                        <div className="flex justify-between items-center text-lg font-bold ">
                            <span>Total</span>
                            <span>{formatCurrencyInCents(order.totalValue ?? 0)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
