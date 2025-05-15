import { IDefaultParamsPaginatedQuery } from "@/@types/generic.types";
import { ListPaginatation } from "@/services/@types/generic";
import { createOrderAsync, getOrderByIdAsync, getOrderListAsync } from "@/services/Order";
import { IOrderReadModel } from "@/services/Order/Order.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useOrderListQuery(params?: IDefaultParamsPaginatedQuery) {
    return useQuery({
        queryKey: ['order-get-list', params],
        enabled: true,
        refetchOnMount: false,
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
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getOrderByIdAsync(id!);
            return data as IOrderReadModel;
        }
    })
}

export function useCreateOrderMutation(onSuccess: () => void) {
    return useMutation({
        mutationFn: async (payload: {userId: string, cartIds: string[]}) => {
            return await createOrderAsync(payload.userId, payload.cartIds)
        },
        onSuccess
    })
}
