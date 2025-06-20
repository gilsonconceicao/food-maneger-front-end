import { IDefaultParamsPaginatedQuery } from "@/@types/generic.types";
import { ListPaginatation } from "../@types/generic";
import apiClient from "../config/axios";
import { IOrderReadModel } from "./Order.type";
import { FieldValues } from "react-hook-form";

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

export const getAdminOrdersAsync = async (params?: IDefaultParamsPaginatedQuery) => {
      const config = {
        params: {
            ...params,
            page: params?.page ?? 0,
            size: params?.size ?? 30
        }
    };

    return await apiClient.get<ListPaginatation<IOrderReadModel>>(`${endpoint}/Admin`, config)
};

export const getOrderByIdAsync = async (id: string) => await apiClient.get<IOrderReadModel>(`${endpoint}/${id}`);

export const createOrderAsync = async (userId: string, cartIds: string[]) => {
    const path = `${endpoint}/${userId}`;
    return await apiClient
        .post<string>(path, { cartIds });
}

export const cancelOrderAsync = async (orderId: string) => {
    const path = `${endpoint}/${orderId}/Cancel`;
    return await apiClient.put<boolean>(path, {});
}

export const deleteOrderAsync = async (orderId: string) => {
    const path = `${endpoint}/${orderId}`;
    return await apiClient.delete<boolean>(path, {});
}

export const updateOrderStatusAsync = async (orderId: string) => {
    const path = `${endpoint}/${orderId}/UpdateStatus`;
    return await apiClient.put<boolean>(path, {});
}

export const updateOrderAsync = async (orderId: string, body: FieldValues) => {
    const path = `${endpoint}/${orderId}`;
    return await apiClient.put<boolean>(path, body);
}