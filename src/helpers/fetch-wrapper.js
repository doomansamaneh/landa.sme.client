import axios from "axios"
import { useAuthStore } from "../stores"
import { useAlertStore } from "../stores"

const BASE_URL = "http://localhost:9090"
//const BASE_URL = "https://api.landa-sme.ir"

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

export const fetchWrapper = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE")
}

function createRequest(method) {
  return (url, data) => {

    clearError()
    const fullUrl = `${BASE_URL}/${url}`
    const authHeaders = getAuthHeaders(fullUrl)
    return axios({
      method: method,
      url: fullUrl,
      headers: authHeaders,
      data: data
    })
      .then(handleKnownError.bind(null, url))
      .catch(handleError.bind(null, url))

    // .then((response) => {
    //   return handleKnownError(url, response)
    // })
    // .catch((error) => {
    //   return handleError(url, error)
    // })
  }
}

function getAuthHeaders(url) {
  const { user } = useAuthStore()
  const isLoggedIn = !!user?.token

  const headers = {};

  if (isLoggedIn && isApiUrl(url)) {
    headers.Authorization = `Bearer ${user.token}`
  }

  // const cookie = getCookie(".Landa.SME.Culture")
  // if (cookie) {
  //   headers.Cookie = cookie
  // }

  return headers
}

function getCookie(name) {
  //return `${name}=fa`
  const cookieValue = document.cookie.match(`(^|[^;]+)\\s*${name}\\s*=\\s*([^;]+)`)
  return cookieValue ? cookieValue.pop() : null
}

function handleKnownError(url, response) {
  if (response.data.code === 0) return Promise.reject(response)
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

function isApiUrl(url) {
  return true
}

function clearError() {
  useAlertStore().clear()
}

function setError(error) {
  useAlertStore().set(error)
}
