import { register } from "register-service-worker";
import { Dialog } from "quasar";
import NewReleaseDialog from "src/components/shared/NewReleaseDialog.vue";
import { appInstance } from "src/boot/i18n";

let swVersion = null;
let dialogShown = false;

const requestVersionFromSW = async () => {
  if (
    "serviceWorker" in navigator &&
    navigator.serviceWorker.controller
  ) {
    try {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        if (event.data && event.data.type === "SW_VERSION_INFO") {
          swVersion = event.data.version;
        }
      };
      navigator.serviceWorker.controller.postMessage(
        { type: "GET_VERSION" },
        [messageChannel.port2]
      );
    } catch {}
  }
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SW_VERSION_INFO") {
      swVersion = event.data.version;

      if (swVersion && !dialogShown) {
        dialogShown = true;
        Dialog.create({
          component: NewReleaseDialog,
          componentProps: {
            swVersion: swVersion,
          },
          ...(appInstance && { app: appInstance }),
        });
      }
    }
  });
}

register(process.env.SERVICE_WORKER_FILE, {
  ready() {
    requestVersionFromSW();
  },

  registered(registration) {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible")
        registration.update();
    });
  },

  cached() {},

  updatefound() {},

  updated(registration) {
    dialogShown = false;

    setTimeout(() => {
      if (!swVersion && !dialogShown) {
        dialogShown = true;
        Dialog.create({
          component: NewReleaseDialog,
          ...(appInstance && { app: appInstance }),
        });
      }
    }, 1000);
  },

  offline() {},

  error() {},
});
