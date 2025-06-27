import { useState } from 'react'
import AdminOrders from './AdminOrders'
import { useAdminOrderListQuery, useUpdateOrderStatusMutate } from '@/hooks/Order/useOrderHook';
import { Loading } from '@/components/Loading/Loading';
import { FailureError } from '@/components/FailureError/FailureError';
import { OrderEmptyMessage } from '@/components/Order/OrderEmptyMessage';
import { Modal } from '@/components/Modal/Modal';
import toast from 'react-hot-toast';

export const AdminOrdersContainer = () => {
    const [action, setAction] = useState<{ action: string, orderId: string } | null>(null);
    const [page, setPage] = useState<number>(0);

    const { data: orderListData, isLoading, error, refetch, isFetching } = useAdminOrderListQuery({ page, size: 5 });

    const { mutateAsync: updateStatusMutateAsync, isPending: isLoadingUpdateStatus } = useUpdateOrderStatusMutate(() => {
        refetch();
        setAction(null);
        toast.success('Status do pedido atualizado com sucesso');
    });


    const isEmpty = orderListData?.data?.length === 0;

    const onClose = () => setAction(null);

    if (isLoading) return <Loading />
    if (error) return <FailureError error={error} />
    if (isEmpty) return <OrderEmptyMessage />

    return (
        <>
            <AdminOrders {...{
                isLoading,
                orderListData: orderListData!,
                setPage,
                page,
                setAction: (action: string, orderId: string) => setAction({ action, orderId }), 
                refetch, 
                isFetching
            }} />

            <Modal
                open={!!action}
                onOpenChange={() => { }}
                title={`Atualizar status do pedido `}
                description={`Ação exclusiva para admin`}
                cancelText="Fechar"
                loading={isLoadingUpdateStatus}
                onConfirm={() => updateStatusMutateAsync(action!.orderId!)}
                onCancel={onClose}
            />
        </>
    )
}
