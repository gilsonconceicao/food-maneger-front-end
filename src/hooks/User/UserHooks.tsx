import { useAuthContext } from "@/contexts/AuthContext";
import { handleOnError } from "@/helpers/Methods";
import { createUserAsync, getUserById, updateUserById, verifyUserIsMasterAsync } from "@/services/User";
import { CreateUserType, User } from "@/services/User/user.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export function useVerifyUserIsMaster(userId?: string) {
        const contextUser = useAuthContext();

    return useQuery({
        queryKey: ['verify-user-is-master', userId],
        enabled: !!contextUser.token,
        refetchOnMount: 'always',
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await verifyUserIsMasterAsync(userId!) ?? false;
            return data as boolean;
        }
    })
};

export function useGetUserQuery() {
    const { user: { userId } } = useAuthContext();
    return useQuery({
        queryKey: ['get-user-by-id', userId],
        enabled: !!userId,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await getUserById(userId!) ?? false;
            return data as User;
        }
    })
};

export function useUpdateUserByIdMutate(
    onSuccess: (isDeleted: boolean) => void
) {
    const { user: { userId } } = useAuthContext();

    return useMutation({
        mutationFn: async (body: CreateUserType) => {
            const payload = {
                address: {
                    ...body.address, 
                    zipCode: body.address?.zipCode.replace(/\D/g, "").trim() ?? null
                },
                name: body?.name ?? null,
                phoneNumber: body.phoneNumber?.replace(/\D/g, "").trim() ?? null, 
            } as CreateUserType;

            return await updateUserById(userId!, payload) as unknown as boolean;
        },
        onSuccess,
        onError: handleOnError
    })
}

export function useCreateUserMutate(
    onSuccess?: (isDeleted: boolean) => void
) {
    return useMutation({
        mutationFn: async (body: FieldValues) => {
            return await createUserAsync(body) as unknown as boolean;
        },
        onSuccess,
        onError: handleOnError
    })
}
