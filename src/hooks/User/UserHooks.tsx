import { verifyUserIsMasterAsync } from "@/services/User";
import { useQuery } from "@tanstack/react-query";

export function useVerifyUserIsMaster(userId?: string, queryKey?: number) {
    return useQuery({
        queryKey: ['verify-user-is-master', userId, queryKey],
        enabled: !!userId ,
        refetchOnMount: false, // adding the 'always' option might be a good thing, try...
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { data } = await verifyUserIsMasterAsync(userId!) ?? false;
            return data as boolean;
        }
    })
};