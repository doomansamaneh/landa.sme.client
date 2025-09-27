import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "src/stores";
import { useAlertStore } from "src/stores";
import { baseUrl } from "src/constants";
import { Loading } from "quasar";
import ConnectionLostDialog from "src/components/shared/ConnectionLostDialog.vue";

// Global reference to Quasar instance
let $q = null;

// Function to set Quasar instance
export const setQuasarInstance = (quasarInstance) => {
  $q = quasarInstance;
};

// Configure axios defaults
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
// Prevent reuse of broken sockets - this is the key fix!
axios.defaults.httpAgent = false;
axios.defaults.httpsAgent = false;

const requestCount = ref(0);
const isConnectionDialogOpen = ref(false);

export const fetchWrapper = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  delete: createRequest("DELETE"),
  downloadGet: createRequest("GET", "blob"),
  downloadPost: createRequest("POST", "blob"),
  retryConnection: retryConnection,
};

export { isConnectionDialogOpen };

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
  return async (url, data, silentOrDisableLoader) => {
    const silent = silentOrDisableLoader === true;
    if (!silent) onInitRequest();

    const fullUrl = `${baseUrl}/${url}`;
    const authHeaders = getAuthHeaders(fullUrl);
    let cleanedData =
      data instanceof FormData ? data : removeEmpty(data);

    try {
      const response = await axios({
        method,
        url: fullUrl,
        headers: authHeaders,
        data: cleanedData,
        responseType,
      });
      return await handleKnownError(url, response);
    } catch (error) {
      return await handleError(url, error);
    } finally {
      if (!silent) onCompleteRequest();
    }
  };
}

function getAuthHeaders(url) {
  return {};
}

function handleKnownError(url, response) {
  if (response.data.code === 0 || response.data.code === 500)
    return Promise.reject(response);
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
    const { logout } = useAuthStore();

    if (error.response.status === 401) {
      logout();
      return Promise.reject(error);
    } else if (error.response.status === 403) {
      alertData.message = "forbidden";
      alertData.comment = url;
    } else if (error.response.data) {
      alertData.message =
        error.response.data.message ?? "validationError";
      alertData.errors = error.response.data.errors;
      alertData.comment = error.response.data.stackTrace;
    }
  } else if (
    !navigator.onLine ||
    error.code === "ECONNABORTED" ||
    error.message === "Network Error"
  ) {
    if (
      typeof $q !== "undefined" &&
      $q?.dialog &&
      !isConnectionDialogOpen.value
    ) {
      isConnectionDialogOpen.value = true;
      $q.dialog({
        component: ConnectionLostDialog,
        onDismiss: () => {
          isConnectionDialogOpen.value = false;
        },
      });
    }
    return Promise.reject(error);
  } else {
    alertData.message =
      typeof error === "string" ? error : "Unknown error occurred";
  }

  setError(alertData);
  return Promise.reject(error);
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

async function retryConnection() {
  try {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}/account/CheckConnection`,
      timeout: 5000,
    });

    if (response.status === 200) {
      isConnectionDialogOpen.value = false;
      return true;
    }
  } catch (error) {
    return false;
  }
}
