import axios, { AxiosRequestConfig } from "axios"
import { BASE_URL } from "../api"
import { CreateUserType } from "./user.types"
const url = `${BASE_URL}/User`

export const createUserManaulAsync = async (user: CreateUserType, token: string) => {
    const config: AxiosRequestConfig<CreateUserType> = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.post(`${url}`, user, config); 
}

export const verifyUserIsMasterAsync = async (userId: string, token: string) => {
    const config: AxiosRequestConfig<boolean> = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.get<boolean>(`${url}/VerifyUserIsMaster/${userId}`, config); 
}
