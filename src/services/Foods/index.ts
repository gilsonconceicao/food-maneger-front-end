import axios, { AxiosRequestConfig } from "axios"
import { BASE_URL } from "../api"
import { ListPaginatation } from "../@types/generic";
import { Food, FoodCreateDTO, FoodParamsQuery } from "./Foods.type";

const url = `${BASE_URL}/Food`

export const getListFoodAsync = async (params?: FoodParamsQuery) =>
    await axios.get<ListPaginatation<Food>>(`${url}`, {
        params: {
            ...params,
            page: params?.page ?? 0,
            size: params?.size ?? 30
        }
    });

export const getFoodById = async (id: string) =>
    await axios.get<Food>(`${url}/${id}`);

export const createFoodAsync = async (values: FoodCreateDTO, token: string) => {

    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return await axios.post(`${url}`, values, config)
};

export const updateFoodAsync = async (id: string, values: FoodCreateDTO, token: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return await axios.patch(`${url}/${id}`, values, config);
};