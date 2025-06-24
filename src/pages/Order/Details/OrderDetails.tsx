import { IOrderReadModel } from "@/services/Order/Order.type"
import { CalendarClock, ChartPie, Mail, MapPin, MapPinHouse, Minus, Phone, Plus, Receipt, Trash2, User as UserIcon, Wallet, XCircle } from "lucide-react"
import { statusConfig } from "../OrderGeneric"
import { formatCurrencyInCents, formatPhoneNumber, renderUrlImageValidate } from "@/helpers/Methods"
import { GoBack } from "@/components/GoBack/GoBack"
import { Link, useNavigate } from "react-router"
import { useAuthContext } from "@/contexts/AuthContext"
import { User } from "@/services/User/user.types"
import { Alert, AlertTitle } from "@/components/ui/alert"
import OrderTimeline from "@/components/OrderTimeline/OrderTimeline"
import { ObservationSection } from "./Observations/ObservationSection"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"

type OrderDataType = {
    order: IOrderReadModel;
    setAction: (a: string) => void;
    isLoading: boolean;
    user: User;
    refetch: () => void;
}

export const OrderDetails = ({ order, setAction, isLoading, user, refetch }: OrderDataType) => {
    const navigate = useNavigate();
    const { user: { isMaster } } = useAuthContext();
    const { updateQuantity, isLoading: isLoadingCart } = useCart();

    const createdAtFormted = formatDate(order.createdAt);
    const updatedAtFormated = formatDate(order.updatedAt);
    const orderStatus = order.status;

    const enablePaymentAction = ['AwaitingPayment', 'Expired'].includes(orderStatus);
    const isGeneratedExternalPayment = orderStatus === 'AwaitingPayment' && order.paymentId !== null;

    const statusDisplay = isGeneratedExternalPayment ? "Concluir pagamento" : order.statusDisplay;
    const color = isGeneratedExternalPayment ? "text-orange-600 bg-orange-200" : statusConfig[orderStatus].color;

    const canCancelAndAddReasion: boolean = ['AwaitingPayment', 'PaymentFailed', 'Expired'].includes(orderStatus);
    const canDelete: boolean = ['Cancelled', 'PaymentFailed'].includes(orderStatus);
    const canTimeline: boolean = !['Cancelled', 'PaymentFailed', 'Expired'].includes(orderStatus);
    const canEditQuantity: boolean = ['AwaitingPayment', 'Expired'].includes(orderStatus);
    const canUpdateStatus: boolean = ['Paid', 'InPreparation', 'Done', 'Delivery'].includes(orderStatus);

    const userAddress = user.address ?? null;

    return (
        <div className="space-y-4 max-w-4xl mx-auto p-4">
            <GoBack path="/pedidos" />

            <div className="bg-orderCard rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-xl font-bold ">
                                Pedido #{order.orderNumber}
                            </h1>
                            <span className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 w-full rounded-sm text-sm font-medium border ${color}`}>
                                {statusConfig[orderStatus].icon}
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

                    <div className="mb-8 bg-card-shadow rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Informações do pedido</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <UserIcon className="w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium ">Nome</p>
                                    <p className="text-sm text-gray-400">{user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium ">Email</p>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium ">Endereço de Entrega</p>
                                    {userAddress !== null && userAddress !== undefined ?
                                        <p className="text-sm text-gray-400">
                                            {userAddress.street}, {userAddress.number}
                                            {userAddress.complement && ` - ${userAddress.complement}`}<br />
                                            {userAddress.city}/{userAddress.state} <br />
                                            CEP: {userAddress.zipCode}
                                        </p> :
                                        <p className="text-sm text-gray-400">
                                            Não informado
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium ">Telefone</p>
                                    <p className="text-sm text-gray-400">{formatPhoneNumber(user.phoneNumber ?? "")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-card-shadow rounded-lg">
                            <CalendarClock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium ">Data do pedido</p>
                                <p className="text-sm text-gray-400">{createdAtFormted}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-card-shadow rounded-lg">
                            <Receipt className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium ">Última atualização</p>
                                <p className="text-sm text-gray-400">{updatedAtFormated === '01/01/1, 00:00' ? createdAtFormted : updatedAtFormated}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-color-border pt-6">
                        <h2 className="text-lg font-semibold  mb-4">Itens do pedido</h2>

                        <ul className="divide-y border-color-border">
                            {order.items.map((item, index) => {
                                const quantity = item.quantity ?? 0;
                                return (
                                    <li key={index} className="py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={renderUrlImageValidate(item.food.url)}
                                                alt={item.food.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className=" min-w-0">
                                                <p className="font-medium ">{item.food.name}</p>

                                                <div className="mt-1 flex items-center gap-4 mb-2">
                                                    <p className="text-sm text-gray-500">
                                                        {quantity}x &nbsp;
                                                        {formatCurrencyInCents(item.food.price)}
                                                    </p>
                                                    <p className="text-sm font-medium ">
                                                        {formatCurrencyInCents(item.food.price * (quantity ?? 0))}
                                                    </p>
                                                </div>
                                                <div className=" flex items-center gap-3">
                                                    {canEditQuantity && (
                                                        <>
                                                            <div className="flex items-center gap-2 bg-card-shadow rounded-lg p-1">
                                                                <Button
                                                                    variant='outline'
                                                                    size='icon'
                                                                    onClick={() => updateQuantity(item.foodId, order.id, quantity - 1, () => refetch())}
                                                                    className="p-1 rounded-full transition-colors disabled:opacity-50"
                                                                    disabled={quantity <= 1 || isLoadingCart}
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </Button>
                                                                <span className="w-8 text-center font-medium">{quantity}</span>
                                                                <Button
                                                                    variant='outline'
                                                                    size='icon'
                                                                    onClick={() => updateQuantity(item.foodId, order.id, quantity + 1, () => refetch())}
                                                                    disabled={isLoadingCart}
                                                                    className="p-1 rounded-full transition-colors"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                            <Button
                                                                variant='outline'
                                                                size='icon'
                                                                onClick={() => { }}
                                                                className="p-2 rounded-lg transition-colors"
                                                                title="Remover item"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="border-t border-color-border mt-6 pt-6 mb-4">
                        <div className="flex justify-between items-center text-lg font-bold ">
                            <span>Total</span>
                            <span className=" text-primary font-bold">{formatCurrencyInCents(order.totalValue ?? 0)}</span>
                        </div>
                    </div>


                    <ObservationSection
                        enable={canCancelAndAddReasion}
                        orderId={order.id}
                        refetchOrder={refetch}
                        observations={order.observations}
                    />

                    {userAddress === null && (
                        <Alert className="flex justify-between items-center mb-4">
                            <div className=" flex items-center gap-2">
                                <MapPinHouse />
                                <AlertTitle>
                                    Para seguir, informe um endereço de entrega acessando o seu perfil.
                                </AlertTitle>
                            </div>
                            <Link to={`/perfil?goback=pedido&pedidoId=${order.id}`} className="text-orange-500">Clique aqui</Link>
                        </Alert>
                    )}

                    {enablePaymentAction && (
                        <div className="mb-6">
                            <button
                                disabled={userAddress === null}
                                onClick={() => navigate(`/pedidos/${order.id}/pagamento`)}
                                className={`w-full ${userAddress === null ? "bg-gray-400" : "bg-orange-500"} text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2  `}
                            >
                                <Wallet className="w-5 h-5" />
                                {isGeneratedExternalPayment ? "Finalizar pagamento" : order.status === 'Expired' ? "Pagar novamente" : "Realizar pagamento"}
                            </button>
                        </div>
                    )}
                </div>

                {canTimeline && <div className="p-5">
                    <h2 className="text-lg font-semibold  mb-4">Histórico do pedido</h2>

                    <OrderTimeline status={orderStatus} />
                </div>}

                {(isMaster && canUpdateStatus) || canCancelAndAddReasion || canDelete &&
                    <div className="p-5 space-y-2">
                        <h2 className="text-lg font-semibold">Outras ações</h2>

                        <div className="border-t border-gray-800 flex gap-3 pt-3">
                            {isMaster && canUpdateStatus && (
                                <button
                                    onClick={() => setAction('updateStatus')}
                                    disabled={isLoading}
                                    className="px-4 py-2 border text-white  bg-purple-950 rounded-lg hover:bg-purple-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <ChartPie className="w-5 h-5" />
                                    Atualizar status do pedido
                                </button>
                            )}
                            {canCancelAndAddReasion && (
                                <button
                                    onClick={() => setAction('cancel')}
                                    disabled={isLoading}
                                    className=" px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <XCircle className="w-5 h-5" />
                                    Cancelar Pedido
                                </button>
                            )}
                            {canDelete && (
                                <button
                                    onClick={() => setAction('delete')}
                                    disabled={isLoading}
                                    className=" px-4 py-2 border text-white  bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    Excluir Pedido
                                </button>
                            )}
                        </div>
                    </div>}
            </div>
        </div >
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
