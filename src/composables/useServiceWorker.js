import { ref } from "vue";

const isSupported = ref(
  typeof navigator !== "undefined" && "serviceWorker" in navigator
);

const controller = ref(null);

export function useServiceWorker() {
  const getController = () => {
    if (!isSupported.value) return null;
    return navigator.serviceWorker.controller || controller.value;
  };

  const sendMessage = (message, timeout = 500) => {
    return new Promise((resolve) => {
      const swController = getController();
      if (!swController) {
        resolve({
          success: false,
          error: "Service worker not available",
        });
        return;
      }

      try {
        const messageChannel = new MessageChannel();
        let resolved = false;

        messageChannel.port1.onmessage = (event) => {
          if (!resolved) {
            resolved = true;
            resolve(event.data);
          }
        };

        swController.postMessage(message, [messageChannel.port2]);

        setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve({ success: false, error: "Timeout" });
          }
        }, timeout);
      } catch (error) {
        resolve({ success: false, error: error.message });
      }
    });
  };

  const clearApiCache = async () => {
    const response = await sendMessage(
      { type: "CLEAR_API_CACHE" },
      300
    );
    return response?.success === true;
  };

  const getVersion = async () => {
    return await sendMessage({ type: "GET_VERSION" });
  };

  return {
    isSupported,
    clearApiCache,
    getVersion,
    sendMessage,
  };
}
