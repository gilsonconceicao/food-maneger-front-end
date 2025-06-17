import { handleOnError } from "@/helpers/Methods";
import { contactCreateAsync } from "@/services/Contact";
import { ContactCreateDTO } from "@/services/Contact/contact.types";
import { useMutation } from "@tanstack/react-query";

export function useCreateContactMutate(onSuccess?: () => void) {
    return useMutation({
        mutationFn: async (values: ContactCreateDTO) => {
            return await contactCreateAsync({
                ...values,
                phoneNumber: values.phoneNumber?.replace(/\D/g, "").trim() ?? null
            })
        },
        onSuccess,
        onError: handleOnError
    })
}
