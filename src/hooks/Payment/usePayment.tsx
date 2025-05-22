import { createPaymentPreference, getPreferencePaymentById } from "@/services/Payment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Preference } from "mercadopago";

export function usePreferencePaymentByIdQuery(preferenceId: string) {
    return useQuery({
        queryKey: ['get-preference-payment-by-id', preferenceId],
        enabled: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getPreferencePaymentById(preferenceId);
            return data as Preference;
        }
    })
}

export function useCreatePaymentPreferenceMutate(onSuccess: () => void) {
    return useMutation({
        mutationFn: async (orderIds: string[]) => {
            return await createPaymentPreference(orderIds);
        }, 
        onSuccess, 
        onError: () => {}
    })
}