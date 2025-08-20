import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { createHandlerBoundToURL } from "workbox-precaching";

// ⚠️ فقط اگر از InjectManifest استفاده می‌کنی
// console.log("[SW] مرحله 0: شروع پیش‌کش کردن فایل‌ها");
precacheAndRoute(self.__WB_MANIFEST);
// console.log("[SW] مرحله 0: پیش‌کش کردن فایل‌ها کامل شد");

// ✅ 1. کش کردن پاسخ‌های API با Stale-While-Revalidate
// console.log(
//   "[SW] مرحله 1: ثبت route برای API با StaleWhileRevalidate"
// );
registerRoute(
  ({ request }) => {
    const isApi =
      request.destination === "" && request.url.includes("/api/");
    if (isApi) {
      console.log(`[SW] درخواست API شناسایی شد: ${request.url}`);
    }
    return isApi;
  },
  new StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 1 ساعت
      }),
    ],
  })
);

// ✅ 2. کش کردن تصاویر با CacheFirst
// console.log("[SW] مرحله 2: ثبت route برای تصاویر با CacheFirst");
registerRoute(
  ({ request }) => {
    const isImage = request.destination === "image";
    if (isImage) {
      console.log(`[SW] تصویر شناسایی شد: ${request.url}`);
    }
    return isImage;
  },
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // یک هفته
      }),
    ],
  })
);

// ✅ 3. صفحه fallback آفلاین
// console.log("[SW] مرحله 3: ثبت route برای fallback آفلاین");
// registerRoute(
//   new NavigationRoute(createHandlerBoundToURL("/offline.html"), {
//     denylist: [
//       // مسیری که برای Service Worker هست رو مستثنا می‌کنیم
//       new RegExp(process.env.PWA_SERVICE_WORKER_REGEX),
//       /workbox-(.)*\.js$/,
//     ],
//   })
// );

// ✅ 4. Listener برای نصب و فعال‌سازی (اختیاری برای کنترل دقیق‌تر)
self.addEventListener("install", (event) => {
  console.log("[SW] مرحله 4: رویداد install");
  self.skipWaiting(); // فوری فعال شه
});

self.addEventListener("activate", (event) => {
  console.log("[SW] مرحله 4: رویداد activate");
  clients.claim(); // تمام تب‌ها از SW جدید استفاده کنن
});
