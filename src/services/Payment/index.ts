
import { apiClient } from "../config/axios"

const endpoint = `/Payment`

export const generatePayment = async (items: string[]) => {
    const body = { items }
    return await apiClient.post(`${endpoint}`, body); 
}