import axios from "axios"
import { BASE_URL } from "../api"
const url = `${BASE_URL}/User`

/** 
 * This method generates a payment by items
*/
export const generatePayment = async (items: string[], token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const body = { items }
    return await axios.post(`${url}`, body, config); 
}