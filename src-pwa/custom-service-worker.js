import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";

self.__WB_DISABLE_DEV_LOGS = true
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => {
    return (
      request.destination === "" && request.url.includes("/api/")
    );
  },
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => {
    return request.destination === "image";
  },
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

const APP_VERSION = process.env.APP_VERSION || "0.0.1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();

      try {
        const allClients = await self.clients.matchAll({
          includeUncontrolled: true,
        });

        for (const client of allClients) {
          client.postMessage({
            type: "SW_VERSION_INFO",
            version: APP_VERSION,
            timestamp: Date.now(),
          });
        }
      } catch (error) {}

      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName.startsWith("quasar-") ||
              cacheName.startsWith("workbox-")
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "GET_VERSION") {
    event.ports[0]?.postMessage({
      type: "SW_VERSION_INFO",
      version: APP_VERSION,
      timestamp: Date.now(),
    });
  }
});
