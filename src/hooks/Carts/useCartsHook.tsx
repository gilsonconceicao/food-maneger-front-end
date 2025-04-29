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
            const { data } = await getCartsListAsyc(token!);
            return data as CartType;
        }
    });
}

export function useCreateCartsMutate(onSuccess?: () => void) {
    const { token } = useAuthContext();
    return useMutation({
        mutationFn: async (values: CartTypeCreate) => {
            return await createCartsAsync(values, token!)
        },
        onSuccess,
        onError() {
            // to-do
            // //@ts-expect-error
            // const errorMessage = (error as AxiosError)?.response?.data?.message ?? "Lamento! Ocorreu um erro desconhecido."; 
            // toast.error(errorMessage, {
            //     position: 'top-right'
            // });
        },
    })
}


export function useDeleteCartsMutate(onSuccess?: () => void, onError?: () => void) {
    const { token } = useAuthContext();
    return useMutation({
        mutationFn: async (cartId: string) => {
            return await deleteCartsAsync(cartId, token!)
        },
        onSuccess,
        onError
    })
}