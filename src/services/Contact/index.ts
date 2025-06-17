import apiClient from "../config/axios";
import { ContactCreateDTO } from "./contact.types";

const endpoint = `/Contact`; 

export const contactCreateAsync = async (values: ContactCreateDTO) => await apiClient.post(endpoint, values);