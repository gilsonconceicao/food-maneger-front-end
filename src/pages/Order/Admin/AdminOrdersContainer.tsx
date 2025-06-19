import React, { useState } from 'react'
import AdminOrders from './AdminOrders'
import { useOrderListQuery } from '@/hooks/Order/useOrderHook';
import { Loading } from '@/components/Loading/Loading';
import { FailureError } from '@/components/FailureError/FailureError';
import { OrderEmptyMessage } from '@/components/Order/OrderEmptyMessage';

export const AdminOrdersContainer = () => {
    const [page, setPage] = useState<number>(0);

    const { data: orderListData, isLoading, error } = useOrderListQuery({
        page,
        size: 5
    });

    const isEmpty = orderListData?.data?.length === 0;

    if (isLoading) return <Loading />
    if (error) return <FailureError error={error} />
    if (isEmpty) return <OrderEmptyMessage />

    return (
        <AdminOrders {...{
            isLoading,
            orderListData: orderListData!,
            setPage,
            page
        }} />
    )
}
