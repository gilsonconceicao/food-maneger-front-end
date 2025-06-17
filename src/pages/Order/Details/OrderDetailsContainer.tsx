import { useNavigate, useParams } from "react-router";
import { OrderDetails } from "./OrderDetails"
import { useCancelOrderMutate, useDeleteOrderMutate, useGetOrderByIdQuery, useUpdateOrderStatusMutate } from "@/hooks/Order/useOrderHook";
import { Loading } from "@/components/Loading/Loading";
import { FailureError } from "@/components/FailureError/FailureError";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal/Modal";
import { useGetUserQuery } from "@/hooks/User/UserHooks";

export const OrderDetailsContainer = () => {
  const [action, setAction] = useState<string | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

    const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();

  const { data: orderData, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const onClose = () => setAction(undefined);

  const onSuccessByAxtion = () => {
    const optionsMessage: { [type: string]: string } = {
      "delete": "Sucesso ao excluir pedido",
      "cancel": "Sucesso ao cancelar pedido", 
      "updateStatus": "Status do pedido atualizado com sucesso"
    }

    const message = optionsMessage[action!];
    toast.success(message);

    if (action === 'delete') 
      navigate(-1);
    
    onClose(); 
    refetch(); 
  }

  const { mutateAsync: cancelMutateAsync, isPending: isLoadingCancel } = useCancelOrderMutate(onSuccessByAxtion);
  const { mutateAsync: deleteMutateAsync, isPending: isLoadingDelete } = useDeleteOrderMutate(onSuccessByAxtion);
  const { mutateAsync: updateStatusMutateAsync, isPending: isLoadingUpdateStatus } = useUpdateOrderStatusMutate(onSuccessByAxtion);

  if (isLoading || isLoadingUser) return <Loading />
  if (error) return <FailureError error={error} />

  return (
    <>
      <OrderDetails
        refetch={refetch}
        order={orderData!}
        setAction={setAction}
        user={userData!}
        isLoading={isLoadingDelete || isLoadingCancel || isLoadingUpdateStatus}
      />

      <Modal
        open={!!action && ["delete"].includes(action)}
        onOpenChange={() => {} }
        title={`Excluir pedido #${orderData?.orderNumber}`}
        description={`Você tem certeza que deseja excluir pedido?`}
        confirmText="Confirmar"
        cancelText="Fechar"
        loading={isLoadingDelete}
        onConfirm={() => deleteMutateAsync(id!)}
        onCancel={onClose}
      />

      <Modal
        open={!!action && ["cancel"].includes(action)}
        onOpenChange={() => {} }
        title={`Cancelar pedido #${orderData?.orderNumber}`}
        description={`Você tem certeza que deseja cancelar pedido?`}
        cancelText="Fechar"
        loading={isLoadingCancel}
        onConfirm={() => cancelMutateAsync(id!)}
        onCancel={onClose}
      />

      <Modal
        open={!!action && ["updateStatus"].includes(action)}
        onOpenChange={() => {} }
        title={`Atualizar status do pedido #${orderData?.orderNumber}`}
        description={`Ação exclusiva para admin`}
        cancelText="Fechar"
        loading={isLoadingCancel}
        onConfirm={() => updateStatusMutateAsync(id!)}
        onCancel={onClose}
      />
    </>
  )
}
