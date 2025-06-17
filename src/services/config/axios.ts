import axios from "axios";
import { BASE_URL } from "./api";
import { getAuth } from "firebase/auth";

const apiClient = axios.create({
    baseURL: BASE_URL
}); 


apiClient.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;