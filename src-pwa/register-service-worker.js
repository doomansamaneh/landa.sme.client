import { register } from "register-service-worker";
import { Dialog } from "quasar";
import { appInstance } from "src/boot/i18n";
import NewReleaseDialog from "src/components/shared/NewReleaseDialog.vue";

const CURRENT_APP_VERSION = process.env.APP_VERSION || "1.0.0";

let dialogShown = false;
let refreshing = false;
let chunkReloaded = false;

// --------------------------------------------------
// Handle Vite dynamic import / preload errors
// --------------------------------------------------
window.addEventListener("vite:preloadError", (event) => {
  if (chunkReloaded) {
    return;
  }

  chunkReloaded = true;

  event.preventDefault();

  window.location.reload();
});

// --------------------------------------------------
// Show update dialog
// --------------------------------------------------
const showUpdateDialog = (version) => {
  if (!version) return;

  if (version === CURRENT_APP_VERSION || dialogShown) {
    return;
  }

  dialogShown = true;

  Dialog.create({
    component: NewReleaseDialog,
    componentProps: {
      swVersion: version,
    },
    ...(appInstance && { app: appInstance }),
  }).onOk(() => {
    activateWaitingSW();
  });
};

// --------------------------------------------------
// Get version from a specific Service Worker
// --------------------------------------------------
const getSWVersion = (sw) => {
  return new Promise((resolve) => {
    if (!sw) {
      resolve(null);
      return;
    }

    const channel = new MessageChannel();

    const timeout = setTimeout(() => {
      resolve(null);
    }, 3000);

    channel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      resolve(event.data?.version || null);
    };

    sw.postMessage(
      {
        type: "GET_VERSION",
      },
      [channel.port2],
    );
  });
};

// --------------------------------------------------
// Check waiting Service Worker
// --------------------------------------------------
const checkWaitingSW = async (registration) => {
  const waiting = registration?.waiting;

  if (!waiting) {
    return;
  }

  const version = await getSWVersion(waiting);

  showUpdateDialog(version);
};

// --------------------------------------------------
// Activate waiting Service Worker
// Only called after user confirms update
// --------------------------------------------------
const activateWaitingSW = async () => {
  const registration =
    await navigator.serviceWorker.getRegistration();

  const waiting = registration?.waiting;

  if (!waiting) {
    return;
  }

  waiting.postMessage({
    type: "SKIP_WAITING",
  });
};

// --------------------------------------------------
// Service Worker events
// --------------------------------------------------
if ("serviceWorker" in navigator) {
  // Reload only after the user has accepted the update
  // and the new SW has taken control.
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;

    refreshing = true;
    window.location.reload();
  });
}

// --------------------------------------------------
// Register Service Worker
// --------------------------------------------------
register("/sw.js", {
  ready() {
    // No automatic update/reload
  },

  registered(registration) {
    // Check for updates when user returns to the application.
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        registration.update();
      }
    });
  },

  updated(registration) {
    // New SW is waiting.
    // The application must show the update dialog.
    checkWaitingSW(registration);
  },

  error(err) {
    console.error("Service Worker error:", err);
  },
});
