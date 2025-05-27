import { createPaymentPreference, getPreferencePaymentById } from "@/services/Payment";
import { IPreference } from "@/services/Payment/Payment.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function usePreferencePaymentByIdQuery(preferenceId: string) {
    return useQuery({
        queryKey: ['get-preference-payment-by-id', preferenceId],
        enabled: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getPreferencePaymentById(preferenceId);
            return data as IPreference;
        }
    })
}

export function useCreatePaymentPreferenceMutate(onSuccess: (initPoint: string) => void) {
    return useMutation({
        mutationFn: async (orderIds: string[]) => {
            const { data } = await createPaymentPreference(orderIds);
            return data;
        }, 
        onSuccess, 
        onError: () => {}
    })
}