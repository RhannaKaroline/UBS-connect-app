import axios from "axios"
import { useAuthStore } from "@/src/stores/auth-store"

const api = axios.create({
  baseURL: "https://ubs-connect-projeto.onrender.com",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const store = useAuthStore.getState()
      if (store.isAuthenticated) {
        store.logout()
      }
    }
    return Promise.reject(error)
  }
)

export default api
