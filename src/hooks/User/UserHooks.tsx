import { verifyUserIsMasterAsync } from "@/services/User";
import { useQuery } from "@tanstack/react-query";

export function useVerifyUserIsMaster(token: string, userId?: string) {
    return useQuery({
        queryKey: ['verify-user-is-master', token, userId],
        enabled: !!token && !!userId ,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await verifyUserIsMasterAsync(userId!, token) ?? false;
            return data as boolean;
        }
    })
};