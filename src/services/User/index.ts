import apiClient from "../config/axios"

const endpoint = `/User`

export const verifyUserIsMasterAsync = async (userId: string) => {
    return await apiClient.get<boolean>(`${endpoint}/VerifyUserIsMaster/${userId}`);
}
