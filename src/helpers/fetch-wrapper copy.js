import axios from "axios"
import { useAuthStore, useAlertStore } from "../stores"

const baseUrl = "https://api.landa-sme.ir"
axios.defaults.baseURL = baseUrl

const authStore = useAuthStore()
const alertStore = useAlertStore()

axios.interceptors.request.use(() => {
  alertStore.clear()
})

function request(method) {
  return (url, data) => {
    const isApiUrl = true //url.startsWith(import.meta.env.VITE_API_URL)
    const headers = isApiUrl && authStore.user?.token ? { Authorization: `Bearer ${authStore.user.token}` } : {}
    return axios({
      method,
      url: `${baseUrl}/${url}`,
      headers,
      data
    })
      .then(response => {
        if (response.data.code == 0) {
          const error = {
            status: response.status,
            message: response.data.message,
            type: "warning"
          }
          alertStore.set(error)
          return Promise.reject(response)
        }
        return response
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response
          const message = data && data.message ? data.message : "Unknown error"
          const type = status == 401 || status == 403 ? "warning" : "error"
          const alert = { status, message, type }
          alertStore.set(alert)
        } else if (error.request) {
          const alert = {
            status: "100",
            type: "error",
            message: "Network error"
          }
          alertStore.set(alert)
        }
        return Promise.reject(error)
      })
  }
}

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE")
}