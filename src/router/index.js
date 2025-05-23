//import { useI18n } from "vue-i18n";
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
      next("/dashboard");
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
    if (authRequired && !authStore.user) {
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
    //const { t } = useI18n();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title;
    } else {
      document.title = "Landa SME";
    }
  };

  return Router;
});
