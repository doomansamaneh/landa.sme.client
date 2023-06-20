import axios from "axios"
import { useAuthStore, useAlertStore } from "../stores"

const baseUrl = "https://api.landa-sme.ir"
axios.defaults.baseURL = baseUrl

const alertStore = useAlertStore

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE")
}

function request(method) {
  return (url, data) => {
    //url = `${baseUrl}/${url}`
    return new Promise((resolve, reject) => {
      clearError()
      const fullUrl = `${baseUrl}/${url}`
      const authHeaders = authHeader(fullUrl)
      axios({
        method: method,
        url: fullUrl,
        headers: authHeaders,
        data: data
      }).then(response => {
        const result = handleKnownError(response)
        resolve(result)
      }).catch(error => {
        const errorReuslt = handleError(error)
        reject(errorReuslt)
      })
    })
  }
}

function authHeader(url) {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token
  const isApiUrl = true //url.startsWith(import.meta.env.VITE_API_URL)
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` }
  } else {
    return {}
  }
}

async function handleKnownError(response) {
  if (response.data.code == 0) {
    const error = {
      status: response.status,
      message: response.data.message,
      type: "warning"
    }
    setError(error)
    return Promise.reject(response)
  }
  return response
}

async function handleError(error) {
  const response = error.response
  if (response.status) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status)) {
      if (user) { logout() }
    }
    else {
      const data = response.data;
      const alert = {
        status: response.status,
        message: "",
        type: "error"
      }
      if (data && data.message) alert.message = data.message
      setError(alert)
    }
  } else {
    const alert = {
      status: "101",
      type: "error",
      message: "unkown error"
    }
    setError(alert)
  }
  return error
}

function clearError() {
  //alertStore.clear()
  if (!navigator.onLine) {
    setError({
      status: 100,
      type: "info",
      message: "login-page.network-error",
      showAlert: true
    })
  } else {
    alertStore.alert = null
  }
}

function setError(alert) {
  alert.showAlert = true
  alertStore.alert = alert
  //alertStore.set(alert)
}
