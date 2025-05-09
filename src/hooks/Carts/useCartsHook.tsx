import { useAuthContext } from "@/contexts/AuthContext";
import { createCartsAsync, deleteCartsAsync, getCartsListAsyc } from "@/services/Carts";
import { CartType, CartTypeCreate } from "@/services/Carts/Types/CartsType";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCartsListQuery() {
    const { token } = useAuthContext();
    return useQuery({
        queryKey: ['get-carts-list', token],
        enabled: !!token,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getCartsListAsyc();
            return data as CartType;
        }
    });
}

export function useCreateCartsMutate(onSuccess?: () => void) {
    return useMutation({
        mutationFn: async (values: CartTypeCreate) => {
            return await createCartsAsync(values)
        },
        onSuccess,
        onError() {
            // to-do
        },
    })
}


export function useDeleteCartsMutate(onSuccess?: () => void, onError?: () => void) {
    return useMutation({
        mutationFn: async (cartId: string) => {
            return await deleteCartsAsync(cartId)
        },
        onSuccess,
        onError
    })
}