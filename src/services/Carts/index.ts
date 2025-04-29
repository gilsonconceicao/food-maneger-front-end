import axios, { AxiosRequestConfig } from "axios"
import { BASE_URL } from "../api"
import { CartType, CartTypeCreate } from "./Types/CartsType"

const url = `${BASE_URL}/Cart`

export const getCartsListAsyc = async (token: string) => {
    const config: AxiosRequestConfig<CartType> = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.get<CartType>(`${url}`, config); 
}

export const createCartsAsync = async (payload: CartTypeCreate, token: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.post(`${url}`, payload, config); 
}


export const deleteCartsAsync = async (foodId: string, token: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return await axios.delete(`${url}/${foodId}`, config); 
}