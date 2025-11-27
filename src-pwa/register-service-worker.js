import { register } from "register-service-worker";
import { Notify, Dialog } from "quasar";
import NewReleaseDialog from "src/components/shared/NewReleaseDialog.vue";
import { appInstance } from "src/boot/i18n";

register(process.env.SERVICE_WORKER_FILE, {
  ready(/* registration */) {
    console.log("Service worker is active.")
  },

  registered(registration) {
    console.log("Service worker has been registered.")

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible")
        registration.update();
    });
  },

  cached(/* registration */) {
    console.log("Content has been cached for offline use.")
  },

  updatefound(/* registration */) {
    console.log("New content is downloading.")
  },

  updated(/* registration */) {
    console.log("New content is available; please refresh.")

    // Use the app instance to ensure Dialog has access to i18n and all plugins
    Dialog.create({
      component: NewReleaseDialog,
      ...(appInstance && { app: appInstance }),
    });
  },

  offline() {
    console.log("No internet connection found. App is running in offline mode.")
  },

  error(/* err */) {
    console.error("Error during service worker registration:", err)
  },
});
