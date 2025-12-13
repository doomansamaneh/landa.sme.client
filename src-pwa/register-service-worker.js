import { register } from "register-service-worker";
import { appInstance } from "src/boot/i18n";
import { Dialog } from "quasar";
import NewReleaseDialog from "src/components/shared/NewReleaseDialog.vue";

const CURRENT_APP_VERSION = process.env.APP_VERSION || "1.0.0";

let dialogShown = false;
let reloadScheduled = false;

// ----------------------------------------
// Handle SW version
// ----------------------------------------
const handleSWVersion = (version) => {
  if (!version) return;

  if (version !== CURRENT_APP_VERSION && !dialogShown) {
    dialogShown = true;

    Dialog.create({
      component: NewReleaseDialog,
      componentProps: { swVersion: version },
      ...(appInstance && { app: appInstance }),
    }).onOk(() => {
      reloadScheduled = true;
      window.location.reload();
    });
  }
};

// ----------------------------------------
// Request version from SW
// ----------------------------------------
const requestVersionFromSW = () => {
  if (!navigator.serviceWorker?.controller) return;

  const channel = new MessageChannel();
  channel.port1.onmessage = (event) => {
    handleSWVersion(event.data?.version);
  };

  navigator.serviceWorker.controller.postMessage(
    { type: "GET_VERSION" },
    [channel.port2]
  );
};

// ----------------------------------------
// Listen to SW messages
// ----------------------------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "SW_VERSION_INFO") {
      handleSWVersion(event.data.version);
    }
  });
}

// ----------------------------------------
// Register Service Worker
// ----------------------------------------
//register(process.env.SERVICE_WORKER_FILE, {
register("/sw.js", {
  ready() {
    requestVersionFromSW();
  },

  registered(registration) {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        registration.update();
      }
    });
  },

  updated() {
    // SW updated while app is running
    // Force dialog again if not already shown
    dialogShown = false;
    requestVersionFromSW();
  },

  error(err) {
    console.error("Service Worker error:", err);
  },
});
