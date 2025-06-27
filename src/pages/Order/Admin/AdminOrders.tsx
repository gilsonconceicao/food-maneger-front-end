import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Eye, Loader2, Users, Calendar, ChevronLeft, ChevronRight, Ban, ChartPie, RefreshCcw } from 'lucide-react';
import { formatRelativeTime, statusConfig } from '../OrderGeneric';
import { IOrderReadModel } from '@/services/Order/Order.type';
import { formatCurrencyInCents } from '@/helpers/Methods';
import { ListPaginatation } from '@/services/@types/generic';
import { Button } from '@/components/ui/button';
import { GoBack } from '@/components/GoBack/GoBack';
import { useTheme } from '@/components/ui/theme-provider';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

type AdminOrdersProps = {
    orderListData: ListPaginatation<IOrderReadModel>;
    refetch: () => void;
    isLoading: boolean;
    isFetching: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>
    page: number;
    setAction: (action: string, orderId: string) => void;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orderListData, refetch, isLoading, isFetching, page, setPage, setAction }) => {
    const navigate = useNavigate();
    const { isDarkTheme } = useTheme();

    const orders = orderListData?.data ?? [];

    const stats = {
        total: orders.length,
        pending: orders.filter(o => ['awaitingpayment', 'paid', 'inpreparation'].includes(o.status.toLowerCase())).length,
        completed: orders.filter(o => o.status.toLowerCase() === 'finished').length,
        failure: orders.filter(o => ['paymentfailed', 'expired', 'cancelled'].includes(o.status.toLowerCase())).length
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-8xl mx-auto px-4 py-4">
                <GoBack path='/' text='Voltar ao cardápio' />
            </div>

            <div>
                <div className="max-w-8xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Users className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold ">Gerenciar Pedidos</h1>
                                    <p className="text-sm text-gray-500">Painel administrativo</p>
                                </div>
                            </div>
                        </div>
                        <Button onClick={refetch} variant='outline'>
                            <RefreshCcw />
                            Atualizar tabela
                        </Button>
                    </div>
                </div>
            </div>

            {isFetching && (
                <p className='scroll-m-20 ml-5 text-sm font-semibold tracking-tight'>
                    Atualizando...
                </p>
            )}

            <div className="max-w-8xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-sidebar rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Total de Pedidos</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-sidebar rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Em Andamento</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-sidebar rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Concluídos</p>
                                <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                            </div>
                            <div className="p-3 bg-emerald-100 rounded-full">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-sidebar rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Cancelados, Expirados ou Falhas</p>
                                <p className="text-2xl font-bold text-red-600">{stats.failure}</p>
                            </div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <Ban className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-sidebar rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className=" border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Pedido
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Nome
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Itens
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Data
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y ">
                                {orders.map((order) => {
                                    const items = order.items.map(item => item.food.name).join(', ');

                                    return (
                                        <tr key={order.id} className={`hover:${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium ">#{order.id}</div>
                                                    <div className="text-sm text-gray-500">{formatRelativeTime(order.createdAt)}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium ">{order.createdByUserName}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig[order.status].color} `}>
                                                    {statusConfig[order.status].icon}
                                                    {order.statusDisplay}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm ">
                                                    {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                                                </div>
                                                <div className="text-sm text-gray-500 max-w-xs truncate"
                                                    title={items}>
                                                    {items}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium ">
                                                    {formatCurrencyInCents((order.totalValue) ?? 0)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm ">{formatDate(order.createdAt)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <Button size='icon' className=' ' onClick={() => navigate(`/pedidos/${order.id}`)}>
                                                        <Eye className="w-4 h-4" />
                                                    </Button>

                                                    <Button
                                                        size='icon'
                                                        onClick={() => setAction('updateStatus', order.id)}
                                                        className='bg-purple-700 hover:bg-purple-800 text-white  '
                                                    >
                                                        <ChartPie className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {orders.length > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setPage(prev => prev - 1)}
                            disabled={page === 0}
                            className="p-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <h3 className="pnpm dlx shadcn@latest add typography">
                            {page + 1}
                        </h3>

                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={page === orderListData.totalPages - 1}
                            className="p-2 rounded-lg border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;