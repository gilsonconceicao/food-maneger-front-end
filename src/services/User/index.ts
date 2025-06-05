import apiClient from "../config/axios"
import { CreateUserType, User } from "./user.types";

const endpoint = `/User`

export const verifyUserIsMasterAsync = async (userId: string) => {
    return await apiClient.get<boolean>(`${endpoint}/VerifyUserIsMaster/${userId}`);
}

export const getUserById = async (userId: string) => {
    return await apiClient.get<User>(`${endpoint}/${userId}`);
}

export const updateUserById = async (userId: string, body: CreateUserType) => {
    return await apiClient.put<boolean>(`${endpoint}/${userId}`, body);
}
