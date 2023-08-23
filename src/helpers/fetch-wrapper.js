import axios from "axios"
import { useAuthStore } from "../stores"
import { useAlertStore } from "../stores"

//const baseUrl = "https://api.landa-sme.ir"
const baseUrl = "http://localhost:9090"

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
    })
      .then((response) => {
        return handleKnownError(url, response)
      })
      .catch((error) => {
        return handleError(url, error)
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

function handleKnownError(url, response) {
  if (response.data.code == 0) return Promise.reject(response)
  return Promise.resolve(response)
}

function handleError(url, error) {
  const alertData = {
    status: 900,
    message: url,
    type: "error"
  }
  if (error.response) {
    alertData.status = error.response.status
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(error.response.status)) {
      if (user) {
        logout()
      }
    } else {
      const data = error.response.data
      if (data && data.message) alertData.message = data.message
    }
  } else if (error.request) {
    alertData.status = error.request.status
    if (error.data && error.data.message) {
      alertData.type = "warning"
      alertData.message = error.data.message
    } else alertData.message = "login-page.network-error"
  } else {
    alertData.message = error
  }
  setError(alertData)
  return Promise.reject(error)
}

function clearError() {
  useAlertStore().clear()
}

function setError(error) {
  useAlertStore().set(error)
}
