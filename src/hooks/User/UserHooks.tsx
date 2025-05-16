import { verifyUserIsMasterAsync } from "@/services/User";
import { useQuery } from "@tanstack/react-query";

export function useVerifyUserIsMaster(userId?: string) {
    return useQuery({
        queryKey: ['verify-user-is-master', userId],
        enabled: !!userId ,
        refetchOnMount: 'always', 
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await verifyUserIsMasterAsync(userId!) ?? false;
            return data as boolean;
        }
    })
};