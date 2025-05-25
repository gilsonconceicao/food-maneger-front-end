import { useParams } from "react-router";
import { OrderDetails } from "./OrderDetails"
import { useGetOrderByIdQuery } from "@/hooks/Order/useOrderHook";
import { Loading } from "@/components/Loading/Loading";
import { FailureError } from "@/components/FailureError/FailureError";

export const OrderDetailsContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { data: orderData, isLoading, error } = useGetOrderByIdQuery(id);


  if (isLoading) return <Loading />
  if (error) return <FailureError error={error} />

  return <OrderDetails order={orderData!} />
}
