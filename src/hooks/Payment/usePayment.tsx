import { generatePayment } from "@/services/Payment";
import { useMutation } from "@tanstack/react-query";

export function usePaymentMutate(onSuccess: () => void) {
    return useMutation({
        mutationFn: async (items: string[]) => {
            return await generatePayment(items)
        }, 
        onSuccess, 
        onError: () => {
            // to-do
        }
    })
}