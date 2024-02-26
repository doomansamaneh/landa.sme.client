import MainLayout from "src/layouts/MainLayout.vue";
import HomePage from "src/pages/areas/dashboard/IndexPage.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "dashboard",
  meta: {
    icon: "o_dashboard",
  },
  children: [
    { path: "/", redirect: "/dashboard" },
    {
      path: ":businessId",
      component: HomePage,
    },
    {
      path: "/dashboard",
      component: HomePage,
    },
    {
      path: "/crm/customer",
      component: () => import("pages/areas/crm/customer/IndexPage.vue"),
    },
    {
      path: "/crm/customer/preview/:id",
      component: () => import("pages/areas/crm/customer/PreviewPage.vue"),
    },
    // {
    //   path: "sls/quote",
    //   component: () => import("pages/areas/sls/quote/IndexPage.vue"),
    // },
    {
      path: "sls/invoice",
      component: () => import("pages/areas/sls/invoice/IndexPage.vue"),
    },
    {
      path: "sls/invoice/remained/:remained",
      component: () => import("pages/areas/sls/invoice/IndexRemainedPage.vue"),
    },
    {
      path: "/scr/users/settings",
      children: [
        {
          path: "",
          component: () =>
            import("src/pages/management/users/settings/IndexPage.vue"),
        },
        {
          path: "appearance",
          component: () =>
            import(
              "src/pages/management/users/settings/appearance/IndexPage.vue"
            ),
        },
        {
          path: "change-password",
          component: () =>
            import(
              "src/pages/management/users/settings/changePassword/IndexPage.vue"
            ),
        },
      ],
    },
    {
      path: "cmn/productGroup",
      component: () => import("src/pages/areas/cmn/productGroup/IndexPage.vue"),
    },
    {
      path: "cmn/product",
      component: () => import("src/pages/areas/cmn/product/IndexPage.vue"),
    },
    {
      path: "cmn/product/preview/:id",
      component: () => import("src/pages/areas/cmn/product/PreviewPage.vue"),
    },
  ],
};
