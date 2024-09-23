import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "src/stores";
import { useAlertStore } from "src/stores";
import { baseUrl } from "src/constants";
import { Loading } from "quasar";

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

const requestCount = ref(0);

export const fetchWrapper = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE"),
  download: createRequest("GET", "blob"),
};

function removeEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          removeEmpty(item) !== undefined
      )
      .map(removeEmpty);
  } else if (obj !== null && typeof obj === "object") {
    const cleanedObj = Object.keys(obj).reduce((acc, key) => {
      const value = removeEmpty(obj[key]);
      if (
        value !== null &&
        value !== undefined &&
        (typeof value !== "object" ||
          (Array.isArray(value)
            ? value.length
            : Object.keys(value).length))
      ) {
        acc[key] = value;
      }
      return acc;
    }, {});
    return Object.keys(cleanedObj).length ? cleanedObj : undefined;
  }
  return obj;
}

function createRequest(method, responseType) {
  return async (url, data, disableLoader) => {
    if (!disableLoader) onInitRequest();
    const fullUrl = `${baseUrl}/${url}`;
    const authHeaders = getAuthHeaders(fullUrl);

    let cleanedData = data;
    if (data instanceof FormData) {
      authHeaders["Content-Type"] = "multipart/form-data";
    } else cleanedData = removeEmpty(data);

    try {
      try {
        const response = await axios({
          method: method,
          url: fullUrl,
          headers: authHeaders,
          //data: data,
          data: cleanedData,
          responseType: responseType,
        });
        return await handleKnownError(url, response);
      } catch (error) {
        return await handleError(url, error);
      }
    } finally {
      if (!disableLoader) onCompleteRequest();
    }
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
    if (error.response.status === 401) {
      if (user) {
        logout();
      }
    } else if (error.response.status === 403) {
      alertData.message = "forbidden";
      alertData.comment = url;
    } else if (error.response.data) {
      alertData.message =
        error.response.data.message ?? "validationError"; //error.response.data.title;
      alertData.errors = error.response.data.errors;
      alertData.comment = error.response.data.stackTrace;
    }
  } else if (error.request) {
    alertData.status = error.request.status;
    if (error.data && error.data.message) {
      alertData.type = "warning";
      alertData.message = error.data.message;
    } else alertData.message = "network-error";
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
