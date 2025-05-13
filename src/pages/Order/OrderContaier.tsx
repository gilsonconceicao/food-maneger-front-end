import { useOrderListQuery } from '@/hooks/Order/useOrderHook'
import { Order } from './Order'
import { Loader2 } from 'lucide-react';
import { FailureError } from '@/components/FailureError/FailureError';
import { OrderEmptyMessage } from '@/components/Order/OrderEmptyMessage';

export const OrderContaier = () => {

  const { data: orderListData, refetch, isLoading, error } = useOrderListQuery();
  const isEmpty = orderListData?.data?.length === 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-100">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) return <FailureError error={error} />
  if (isEmpty) return <OrderEmptyMessage />;

  return (
    <Order
      orderListData={orderListData!}
      refetch={refetch}
    />
  )
}
