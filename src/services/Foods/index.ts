import { ListPaginatation } from "../@types/generic";
import { apiClient } from "../config/axios";
import { Food, FoodCreateDTO, FoodParamsQuery } from "./Foods.type";

const endpoint = `/Food`

export const getListFoodAsync = async (params?: FoodParamsQuery) => {
    const config = {
        params: {
            ...params,
            page: params?.page ?? 0,
            size: params?.size ?? 30
        }
    };

    return await apiClient.get<ListPaginatation<Food>>(endpoint, config);
}

export const getFoodById = async (id: string) => await apiClient.get<Food>(`${endpoint}/${id}`);

export const createFoodAsync = async (values: FoodCreateDTO) => await apiClient.post(endpoint, values);

export const updateFoodAsync = async (id: string, values: FoodCreateDTO) => await apiClient.patch(`${endpoint}/${id}`, values);