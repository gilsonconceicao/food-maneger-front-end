import { IDefaultParamsPaginatedQuery } from "@/@types/generic.types";
import { handleOnError } from "@/helpers/Methods";
import { ListPaginatation } from "@/services/@types/generic";
import { cancelOrderAsync, createOrderAsync, deleteOrderAsync, getOrderByIdAsync, getOrderListAsync, updateOrderStatusAsync } from "@/services/Order";
import { IOrderReadModel } from "@/services/Order/Order.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useOrderListQuery(params?: IDefaultParamsPaginatedQuery) {
    return useQuery({
        queryKey: ['order-get-list', params],
        enabled: true,
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getOrderListAsync(params);
            return data as ListPaginatation<IOrderReadModel>;
        }
    })
}

export function useGetOrderByIdQuery(id?: string) {
    return useQuery({
        queryKey: ['order-get-by-id', id],
        enabled: !!id && id !== 'adicionar',
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getOrderByIdAsync(id!);
            return data as IOrderReadModel;
        }
    })
}

export function useCreateOrderMutation(onSuccess: (orderId: string) => void) {
    return useMutation({
        mutationFn: async (payload: { userId: string, cartIds: string[] }) => {
            const { data } = await createOrderAsync(payload.userId, payload.cartIds);
            return data;
        },
        onSuccess,
        onError: handleOnError
    })
}

export function useCancelOrderMutate(
    onSuccess: (isUpdated: boolean) => void
) {
    return useMutation({
        mutationFn: async (orderId: string) => {
            return await cancelOrderAsync(orderId) as unknown as boolean;
        },
        onSuccess,
        onError: handleOnError
    })
}

export function useDeleteOrderMutate(
    onSuccess: (isDeleted: boolean) => void
) {
    return useMutation({
        mutationFn: async (orderId: string) => {
            return await deleteOrderAsync(orderId) as unknown as boolean;
        },
        onSuccess,
        onError: handleOnError
    })
}

export function useUpdateOrderStatusMutate(
    onSuccess: (isDeleted: boolean) => void
) {
    return useMutation({
        mutationFn: async (orderId: string) => {
            return await updateOrderStatusAsync(orderId) as unknown as boolean;
        },
        onSuccess,
        onError: handleOnError
    })
}
