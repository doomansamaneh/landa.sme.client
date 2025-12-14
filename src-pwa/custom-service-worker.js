import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

self.__WB_DISABLE_DEV_LOGS = true;

// --------------------------------------------------
// Precache build assets
// --------------------------------------------------
precacheAndRoute(self.__WB_MANIFEST);

// --------------------------------------------------
// Runtime cache: images & fonts
// --------------------------------------------------
registerRoute(
  ({ request }) => ["image", "font"].includes(request.destination),
  new CacheFirst({
    cacheName: "static-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// --------------------------------------------------
// App version
// --------------------------------------------------
const APP_VERSION = process.env.APP_VERSION || "1.0.0";

// --------------------------------------------------
// Install: activate immediately
// --------------------------------------------------
self.addEventListener("install", () => {
  self.skipWaiting();
});

// --------------------------------------------------
// Activate: claim clients & notify version
// --------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });

      for (const client of clients) {
        client.postMessage({
          type: "SW_VERSION_INFO",
          version: APP_VERSION,
        });
      }
    })()
  );
});

// --------------------------------------------------
// Messages from client
// --------------------------------------------------
self.addEventListener("message", (event) => {
  if (event.data?.type === "GET_VERSION") {
    event.ports[0]?.postMessage({
      type: "SW_VERSION_INFO",
      version: APP_VERSION,
    });
  }
});
