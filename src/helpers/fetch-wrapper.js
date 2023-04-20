import axios from "axios"
import { useAuthStore } from "../stores"

//const baseUrl = `${import.meta.env.VITE_API_URL}/users`
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
    url = `${baseUrl}/${url}`

    return axios({
      method: method,
      url: url,
      headers: authHeader(url),
      data: data
    }).catch(handleResponeError)
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

async function handleResponse(response) {
  // check for error response
  if (response.status) {
    const { user, logout } = useAuthStore()
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout()
    }
    return response
  } else {
    // get error message from body or default to response status
    const error = (data && data.message) || response.status
    alert("1. error occured")
    console.log(error)
    return Promise.reject(error)
  }
}

function handleResponeError(error) {
  alert("2. error occured")
  return Promise.reject(error)
}
