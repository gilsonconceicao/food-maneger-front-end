import { ListPaginatation } from "@/services/@types/generic";
import { createFoodAsync, getFoodById, getListFoodAsync, updateFoodAsync } from "@/services/Foods";
import { IFood, FoodCreateDTO, FoodParamsQuery, IFoodReadModel } from "@/services/Foods/Foods.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFoodListQuery(params?: FoodParamsQuery) {
    return useQuery({
        queryKey: ['food-get-list', params], 
        enabled: true, 
        refetchOnMount: false, 
        refetchOnWindowFocus: false, 
        queryFn: async () => {
            const {  data } = await getListFoodAsync(params);
            return data as ListPaginatation<IFoodReadModel>; 
        }
    })
}

export function useFoodByIdQuery(id?: string) {
    return useQuery({
        queryKey: ['food-get-by-id', id], 
        enabled: !!id && id!== 'adicionar', 
        refetchOnMount: false, 
        refetchOnWindowFocus: false, 
        queryFn: async () => {
            const {  data } = await getFoodById(id!);
            return data as IFood; 
        }
    })
}

export function useUpInsertFoodMutate(onSuccess: () => void) {
    return useMutation({
        mutationFn: async (values: FoodCreateDTO) => {
            const payload = {
                ...values, 
                url: values?.url?.replace('https://', '')
            } as FoodCreateDTO
            return await createFoodAsync(payload)
        }, 
        onSuccess
    })
}

export function useUpdateFoodMutate(id: string, onSuccess: () => void) {
    return useMutation({
        mutationFn: async (values: FoodCreateDTO) => {
            const payload = {
                ...values, 
                url: values?.url?.replace('https://', '')
            } as FoodCreateDTO
            return await updateFoodAsync(id, payload)
        }, 
        onSuccess
    })
}