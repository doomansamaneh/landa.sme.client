//import { useI18n } from "vue-i18n";
import { i18nInstance } from "src/boot/i18n";
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

import routes from "./routes";
import { useAuthStore, useAlertStore } from "../stores";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const $q = useQuasar();

    setDocumentTitle(to);

    // Redirect to /dashboard if path === /
    if (to.path === "/") {
      next("/business");
    } else {
      next();
    }

    // Clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // Redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/account/login", "/account/register"];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();
    if (authRequired && !authStore.currentUser) {
      authStore.returnUrl = to.fullPath;
      return "/account/login";
    }

    $q.loading.show({
      message: "",
      boxClass: "bg-dark border-radius-lg text-on-dark text-bold",
      spinnerColor: "primary",
    });
  });

  Router.afterEach(() => {
    const $q = useQuasar();
    $q.loading.hide();
  });

  const setDocumentTitle = (to) => {
    const metaTitle = to?.meta?.title;
    const defaultTitle = "Landa SME";

    if (!metaTitle) {
      document.title = defaultTitle;
      return;
    }

    try {
      const t = i18nInstance?.global?.t;
      if (typeof t === "function") {
        // Allow meta.title to be a function so routes can use JS template literals
        if (typeof metaTitle === "function") {
          try {
            const computed = metaTitle(t, to);
            document.title =
              String(computed || "").trim() || defaultTitle;
            return;
          } catch (e) {
            // fall through to other strategy
          }
        }

        const maybeTranslated = t(metaTitle);
        // If translation returns the same key, treat metaTitle as literal text
        document.title =
          maybeTranslated === metaTitle ? metaTitle : maybeTranslated;
        return;
      }
    } catch (e) {
      // fall through to literal title
    }

    document.title = metaTitle || defaultTitle;
  };

  return Router;
});
