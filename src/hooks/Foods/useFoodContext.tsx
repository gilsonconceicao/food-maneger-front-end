import { ListPaginatation } from "@/services/@types/generic";
import { createFoodAsync, getFoodById, getListFoodAsync, updateFoodAsync } from "@/services/Foods";
import { Food, FoodCreateDTO, FoodParamsQuery } from "@/services/Foods/Foods.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";

export function useFoodListQuery(params?: FoodParamsQuery) {
    return useQuery({
        queryKey: ['food-get-list', params], 
        enabled: true, 
        refetchOnMount: false, 
        refetchOnWindowFocus: false, 
        queryFn: async () => {
            const {  data } = await getListFoodAsync(params);
            return data as ListPaginatation<Food>; 
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
            return data as Food; 
        }
    })
}

export function useCreateFoodMutate(onSuccess: () => void) {
    const { token } = useAuthContext();
    return useMutation({
        mutationFn: async (values: Food) => {
            const payload = {
                ...values, 
                urlImage: values?.url?.replace('https://', '')
            } as FoodCreateDTO
            return await createFoodAsync(payload, token!)
        }, 
        onSuccess
    })
}

export function useUpdateFoodMutate(id: string, onSuccess: () => void) {
    const { token } = useAuthContext();

    return useMutation({
        mutationFn: async (values: Food) => {
            const payload = {
                ...values, 
                urlImage: values?.url?.replace('https://', '')
            } as FoodCreateDTO
            return await updateFoodAsync(id, payload, token!)
        }, 
        onSuccess
    })
}