import { IDefaultParamsPaginatedQuery } from "@/@types/generic.types";
import { ListPaginatation } from "../@types/generic";
import apiClient from "../config/axios";
import { IOrderReadModel } from "./Order.type";

const endpoint = '/Order'

export const getOrderListAsync = async (params?: IDefaultParamsPaginatedQuery) => {
      const config = {
        params: {
            ...params,
            page: params?.page ?? 0,
            size: params?.size ?? 30
        }
    };

    return await apiClient.get<ListPaginatation<IOrderReadModel>>(`${endpoint}`, config)
};

export const getOrderByIdAsync = async (id: string) => await apiClient.get<IOrderReadModel>(`${endpoint}/${id}`);

export const createOrderAsync = async (userId: string, cartIds: string[]) => {
    const path = `${endpoint}/${userId}`;
    return await apiClient
        .post<string>(path, { cartIds });
}