import { IDefaultParamsPaginatedQuery } from "@/@types/generic.types";
import { ListPaginatation } from "../@types/generic";
import { apiClient } from "../config/axios";
import { IFood, FoodCreateDTO } from "./Foods.type";

const endpoint = `/Food`

export const getListFoodAsync = async (params?: IDefaultParamsPaginatedQuery) => {
    const config = {
        params: {
            ...params,
            page: params?.page ?? 0,
            size: params?.size ?? 30
        }
    };

    return await apiClient.get<ListPaginatation<IFood>>(endpoint, config);
}

export const getFoodById = async (id: string) => await apiClient.get<IFood>(`${endpoint}/${id}`);

export const createFoodAsync = async (values: FoodCreateDTO) => await apiClient.post(endpoint, values);

export const updateFoodAsync = async (id: string, values: FoodCreateDTO) => await apiClient.patch(`${endpoint}/${id}`, values);

export const deleteFoodAsync = async (id: string) => await apiClient.delete(`${endpoint}/${id}`);