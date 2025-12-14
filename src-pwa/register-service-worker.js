import { register } from "register-service-worker";
import { Dialog } from "quasar";
import { appInstance } from "src/boot/i18n";
import NewReleaseDialog from "src/components/shared/NewReleaseDialog.vue";

const CURRENT_APP_VERSION = process.env.APP_VERSION || "1.0.0";

let dialogShown = false;

// --------------------------------------------------
// Handle SW version
// --------------------------------------------------
const handleSWVersion = (version) => {
  if (!version) return;

  //alert(`new version: ${version}, current: ${CURRENT_APP_VERSION}`);

  if (version !== CURRENT_APP_VERSION && !dialogShown) {
    dialogShown = true;

    Dialog.create({
      component: NewReleaseDialog,
      componentProps: { swVersion: version },
      ...(appInstance && { app: appInstance }),
    }).onOk(() => {
      window.location.reload();
    });
  }
};

// --------------------------------------------------
// Request version from SW
// --------------------------------------------------
const requestVersionFromSW = () => {
  const sw = navigator.serviceWorker.controller;
  if (!sw) return;

  const channel = new MessageChannel();
  channel.port1.onmessage = (event) => {
    handleSWVersion(event.data?.version);
  };

  sw.postMessage({ type: "GET_VERSION" }, [channel.port2]);
};

// --------------------------------------------------
// Listen to SW messages & controller change
// --------------------------------------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data?.type === "SW_VERSION_INFO") {
      handleSWVersion(event.data.version);
    }
  });

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    requestVersionFromSW();
  });
}

// --------------------------------------------------
// Register Service Worker
// --------------------------------------------------
register(`/sw.js?v=${process.env.APP_VERSION}`, {
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
    dialogShown = false;
    requestVersionFromSW();
  },

  error(err) {
    console.error("Service Worker error:", err);
  },
});
