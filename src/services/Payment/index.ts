
import { AxiosResponse } from "axios";
import { apiClient } from "../config/axios"
import { ICreatePayment, IPay } from "./Payment.type";

const endpoint = `/Payment`

export const createPaymentAsync = async (body: ICreatePayment): Promise<AxiosResponse<IPay>> => {
  return await apiClient.post<IPay>(`${endpoint}`, body);
}

export const getPaymentById = async (paymentId: string): Promise<AxiosResponse<IPay>> => {
  return await apiClient.get<IPay>(`${endpoint}/${paymentId}`);
}