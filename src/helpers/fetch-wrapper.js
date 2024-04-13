import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "src/stores";
import { useAlertStore } from "src/stores";
import { Loading } from "quasar";

// const BASE_URL = "http://localhost:5188";
const BASE_URL = "https://api.landa-sme.ir";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const requestCount = ref(0);

export const fetchWrapper = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE"),
};

function createRequest(method) {
  return (url, data) => {
    onInitRequest();
    const fullUrl = `${BASE_URL}/${url}`;
    const authHeaders = getAuthHeaders(fullUrl);
    return axios({
      method: method,
      url: fullUrl,
      headers: authHeaders,
      data: data,
    })
      .then((response) => {
        //handleKnownError.bind(null, url);
        return handleKnownError(url, response);
      })
      .catch((error) => {
        //handleError.bind(null, url);
        return handleError(url, error);
      })
      .finally(() => {
        onCompleteRequest();
      });
  };
}

function getAuthHeaders(url) {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;

  const headers = {};

  if (isLoggedIn && isApiUrl(url)) {
    headers.Authorization = `Bearer ${user.token}`;
  }

  // const cookie = getCookie(".Landa.SME.Culture")
  // if (cookie) {
  //   headers.Cookie = cookie
  // }

  return headers;
}

function getCookie(name) {
  //return `${name}=fa`
  const cookieValue = document.cookie.match(
    `(^|[^;]+)\\s*${name}\\s*=\\s*([^;]+)`
  );
  return cookieValue ? cookieValue.pop() : null;
}

function handleKnownError(url, response) {
  if (response.data.code === 0) return Promise.reject(response);
  return Promise.resolve(response);
}

function handleError(url, error) {
  const alertData = {
    status: 900,
    message: url,
    type: "error",
  };
  if (error.response) {
    alertData.status = error.response.status;
    const { user, logout } = useAuthStore();
    if ([401, 403].includes(error.response.status)) {
      if (user) {
        logout();
      }
    } else {
      const data = error.response.data;
      if (data && data.message) alertData.message = data.message;
    }
  } else if (error.request) {
    alertData.status = error.request.status;
    if (error.data && error.data.message) {
      alertData.type = "warning";
      alertData.message = error.data.message;
    } else alertData.message = "login-page.network-error";
  } else {
    alertData.message = error;
  }
  setError(alertData);
  return Promise.reject(error);
}

function isApiUrl(url) {
  return true;
}

function onInitRequest() {
  requestCount.value++;
  if (requestCount.value === 1) {
    showLoader();
    clearError();
  }
}

function onCompleteRequest() {
  requestCount.value--;
  if (requestCount.value === 0) {
    hideLoader();
  }
}

function clearError() {
  useAlertStore().clear();
}

function setError(error) {
  useAlertStore().set(error);
}

function showLoader() {
  Loading.show({
    message: "",
    boxClass: "bg-dark border-radius-lg text-on-dark text-bold",
    spinnerColor: "primary",
  });
}

function hideLoader() {
  Loading.hide();
}
