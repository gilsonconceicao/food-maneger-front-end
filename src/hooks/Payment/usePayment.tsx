import { FailureFormatDefault } from "@/@types/generic.types";
import { failureErrorMercadoPago } from "@/helpers/Methods";
import { createPaymentAsync, getPaymentById } from "@/services/Payment";
import { ICreatePayment, IPay } from "@/services/Payment/Payment.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function usePaymentByIdQuery(paymentId?: string) {
    return useQuery({
        queryKey: ['get-payment-by-id', paymentId],
        enabled: !!paymentId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getPaymentById(paymentId!);
            return data as IPay;
        }
    })
}

export function useCreatePaymentMutate(onSuccess: (pay: IPay) => void) {
    return useMutation({
        mutationFn: async (body: ICreatePayment): Promise<IPay> => {
            const { data } = await createPaymentAsync(body);
            return data;
        }, 
        onSuccess, 
        onError: (err: AxiosError) => { 
            const responseData = err.response?.data as FailureFormatDefault; 
            const messageMapped = responseData.message.replace(" ", "_").toLowerCase()
            const message = failureErrorMercadoPago(messageMapped);
            toast.error(message);
        }
    })
}