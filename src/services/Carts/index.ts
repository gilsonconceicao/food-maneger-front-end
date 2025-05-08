import { apiClient } from "../config/axios";
import { CartType, CartTypeCreate } from "./Types/CartsType"

const endpoint = `/Cart`

export const getCartsListAsyc = async () => await apiClient.get<CartType>(endpoint); 

export const createCartsAsync = async (payload: CartTypeCreate) => await apiClient.post(endpoint, payload);

export const deleteCartsAsync = async (foodId: string) => await apiClient.delete(`${endpoint}/${foodId}`);