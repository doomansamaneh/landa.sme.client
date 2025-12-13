// src/composables/usePolling.js
import { ref, onMounted, onUnmounted } from "vue";

export function usePolling(method, timeInterval = 10000) {
  const interval = ref(null);
  const isPolling = ref(false);

  const clear = () => {
    if (interval.value) {
      clearInterval(interval.value);
      interval.value = null;
    }
    isPolling.value = false;
  };

  const fetchData = () => {
    method();
    interval.value = setInterval(() => {
      method();
    }, timeInterval);
  };

  const start = () => {
    clear();
    isPolling.value = true;
    fetchData();
  };

  onMounted(() => {
    if (isPolling.value) {
      fetchData();
    }
  });

  onUnmounted(() => {
    clear();
  });

  return {
    start,
    clear,
    isPolling,
  };
}
