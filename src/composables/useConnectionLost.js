import { ref, onMounted, onUnmounted } from "vue";
import { useQuasar } from "quasar";

import ConnectionLostDialog from "src/components/shared/ConnectionLostDialog.vue";

const isOnline = ref(navigator.onLine);
const connectionDialogShown = ref(false);

export function useConnectionLost() {
  const $q = useQuasar();

  const showConnectionLostDialog = () => {
    if (connectionDialogShown.value) return;
    connectionDialogShown.value = true;

    $q.dialog({
      component: ConnectionLostDialog,
    });
  };

  const handleOnline = () => {
    isOnline.value = true;
    connectionDialogShown.value = false;
  };

  const handleOffline = () => {
    isOnline.value = false;
    showConnectionLostDialog();
  };

  const retryConnection = async () => {
    window.location.reload();
  };

  onMounted(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  });

  return {
    isOnline,
    connectionDialogShown,

    showConnectionLostDialog,
    retryConnection,
  };
}
