import { useAuthContext } from "@/contexts/AuthContext";
import { generatePayment } from "@/services/Payment";
import { useMutation } from "@tanstack/react-query";

export function usePaymentMutate(onSuccess: () => void) {
    const { token } = useAuthContext();

    return useMutation({
        mutationFn: async (items: string[]) => {
            return await generatePayment(items, token!)
        }, 
        onSuccess, 
        onError: () => {
            // to-do
        }
    })
}