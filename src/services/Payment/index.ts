
import { AxiosResponse } from "axios";
import { apiClient } from "../config/axios"
import { IPreference } from "./Payment.type";

const endpoint = `/Payment`

/**
  * Cria um pagamento para os pedidos informados
  * @param orderIds - Lista com os pedidos a serem pagos
  * @param items[].id - Id do pedido
  * @returns InitPoint - Url de redirecionamento para o pagamento
 **/
export const createPaymentPreference = async (orderIds: string[]): Promise<AxiosResponse<string>> => {
  const body = { orderIds }
  return await apiClient.post<string>(`${endpoint}/CreatePreference`, body);
}

/**
  * Obtem um pagamento para os pedidos informados
  * @param preferenceId - Id da preferencia de pagamento
  * @returns Preference - Objeto com os dados do pagamento
 **/
export const getPreferencePaymentById = async (preferenceId: string): Promise<AxiosResponse<IPreference>> => {
  return await apiClient.get<IPreference>(`${endpoint}/${preferenceId}`);
}