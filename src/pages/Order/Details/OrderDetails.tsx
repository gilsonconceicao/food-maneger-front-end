import { IOrderReadModel } from "@/services/Order/Order.type"
import { CalendarClock, ChartPie, Receipt, Trash2, Wallet, XCircle } from "lucide-react"
import { statusConfig } from "../OrderGeneric"
import { formatCurrencyInCents, renderUrlImageValidate } from "@/helpers/Methods"
import { GoBack } from "@/components/GoBack/GoBack"
import { useNavigate } from "react-router"
import { useAuthContext } from "@/contexts/AuthContext"

type OrderDataType = {
    order: IOrderReadModel;
    setAction: (a: string) => void;
    isLoading: boolean;
}

export const OrderDetails = ({ order, setAction, isLoading }: OrderDataType) => {
    const navigate = useNavigate();

    const { user: { isMaster } } = useAuthContext();

    const createdAtFormted = formatDate(order.createdAt);
    const updatedAtFormated = formatDate(order.updatedAt);

    const enablePaymentAction = ['AwaitingPayment', 'Expired'].includes(order.status);
    const isGeneratedExternalPayment = order.status === 'AwaitingPayment' && order.paymentId !== null;

    const statusDisplay = isGeneratedExternalPayment ? "Concluir pagamento" : order.statusDisplay;
    const color = isGeneratedExternalPayment ? "text-orange-600 bg-orange-200" : statusConfig[order.status].color;

    const canCancel: boolean = ['AwaitingPayment', 'PaymentFailed', 'Expired'].includes(order.status);
    const canDelete: boolean = ['Cancelled', 'PaymentFailed'].includes(order.status);
    const canUpdateStatus: boolean = ['Paid', 'InPreparation', 'Done', 'Delivery'].includes(order.status);

    return (
        <div className="space-y-4 max-w-4xl mx-auto p-4">
            <GoBack path="/pedidos" />

            <div className="bg-sidebar rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-xl font-bold ">
                                Pedido #{order.orderNumber}
                            </h1>
                            <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 w-full rounded-sm text-sm font-medium border ${color}`}>
                                {statusConfig[order.status].icon}
                                {statusDisplay}
                            </span>
                        </div>

                        <div className="text-right">
                            <div className="text-2xl font-bold ">
                                {formatCurrencyInCents(order.totalValue ?? 0)}
                            </div>
                        </div>
                    </div>

                    {!!order.failureReason && (
                        <span className={`mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 w-full rounded-sm text-sm font-medium border`}>
                            {order.failureReason}
                        </span>
                    )}

                    {enablePaymentAction && (
                        <div className="mb-6">
                            <button
                                onClick={() => navigate(`/pedidos/${order.id}/pagamento`)}
                                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Wallet className="w-5 h-5" />
                                {isGeneratedExternalPayment ? "Finalizar pagamento" : order.status === 'Expired' ? "Pagar novamente" : "Realizar pagamento"}
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
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantity}x &nbsp;
                                                        {formatCurrencyInCents(item.food.price)}
                                                    </p>
                                                    <p className="text-sm font-medium ">
                                                        {formatCurrencyInCents(item.food.price * (item.quantity ?? 0))}
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
                            <span className=" text-orange-200 font-bold">{formatCurrencyInCents(order.totalValue ?? 0)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-6 pt-6 flex gap-3">
                        {canCancel && (
                            <button
                                onClick={() => setAction('cancel')}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-5 h-5" />
                                Cancelar Pedido
                            </button>
                        )}
                        {canDelete && (
                            <button
                                onClick={() => setAction('delete')}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 border text-white  bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-5 h-5" />
                                Excluir Pedido
                            </button>
                        )}
                    </div>
                    {isMaster && canUpdateStatus && (
                        <button
                            onClick={() => setAction('updateStatus')}
                            disabled={isLoading}
                            className="flex-1 mt-3 px-4 py-2 w-full border text-white  bg-purple-950 rounded-lg hover:bg-purple-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <ChartPie className="w-5 h-5" />
                            Atualizar status do pedido
                        </button>
                    )}
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
