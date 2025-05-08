import axios from "axios";
import { BASE_URL } from "./api";
import { getAccessTokenLocalStorage } from "@/constants/localStorage";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${getAccessTokenLocalStorage}`
    }
}); 