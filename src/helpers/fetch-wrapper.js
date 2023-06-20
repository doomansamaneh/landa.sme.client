import axios from "axios"
import { useAuthStore } from "../stores"
import { useAlertStore } from "../stores"

const baseUrl = "https://api.landa-sme.ir"
axios.defaults.baseURL = baseUrl

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE")
}

function request(method) {
  return (url, data) => {
    clearError()
    const fullUrl = `${baseUrl}/${url}`
    const authHeaders = getAuthHeaders()
    return axios({
      method: method,
      url: fullUrl,
      headers: authHeaders,
      data: data
    }).then(response => {
      return handleKnownError(response)
    }).catch(error => {
      return handleError(error)
    })
  }
}

function getAuthHeaders() {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = true
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

function handleKnownError(response) {
  if (response.data.code == 0) {
    const error = {
      status: response.status,
      message: response.data.message,
      type: "warning"
    }
    setError(error)
    return Promise.reject(response)
  }
  return Promise.resolve(response)
}

function handleError(error) {
  const response = error.response
  if (response.status) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status)) {
      if (user) { logout() }
    }
    else {
      const data = response.data;
      const alertData = {
        status: response.status,
        message: "",
        type: "error"
      }
      if (data && data.message) alertData.message = data.message
      setError(alertData)
    }
  } else {
    const alert = {
      status: "101",
      type: "error",
      message: "unkown error"
    }
    setError(alert)
  }
  return Promise.reject(error)
}

function clearError() {
  useAlertStore().clear()
}

function setError(error) {
  useAlertStore().set(error)
}
