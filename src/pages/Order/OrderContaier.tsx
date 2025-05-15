import { useOrderListQuery } from '@/hooks/Order/useOrderHook'
import { Order } from './Order'
import { FailureError } from '@/components/FailureError/FailureError';
import { OrderEmptyMessage } from '@/components/Order/OrderEmptyMessage';
import { Loading } from '@/components/Loading/Loading';

export const OrderContaier = () => {

  const { data: orderListData, refetch, isLoading, error } = useOrderListQuery();
  const isEmpty = orderListData?.data?.length === 0;


  if (isLoading) return <Loading />
  if (error) return <FailureError error={error} />
  if (isEmpty) return <OrderEmptyMessage />;

  return (
    <Order
      orderListData={orderListData!}
      refetch={refetch}
    />
  )
}
