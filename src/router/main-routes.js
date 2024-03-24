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
      path: "acc/fiscalYear",
      children: [
        {
          path: "",
          component: () => import("pages/areas/acc/fiscalYear/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/acc/fiscalYear/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/acc/fiscalYear/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/acc/fiscalYear/CopyPage.vue"),
        },
      ],
    },
    {
      path: "crm/customer",
      children: [
        {
          path: "",
          component: () => import("pages/areas/crm/customer/IndexPage.vue"),
        },
        {
          path: "preview/:id",
          component: () => import("pages/areas/crm/customer/PreviewPage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/crm/customer/EditProfile.vue"),
        },
      ],
    },
    // {
    //   path: "sls/quote",
    //   component: () => import("pages/areas/sls/quote/IndexPage.vue"),
    // },
    {
      path: "/sls/invoice",
      component: () => import("pages/areas/sls/invoice/IndexPage.vue"),
    },
    {
      path: "/sls/invoice/remained/:remained",
      component: () => import("pages/areas/sls/invoice/IndexRemainedPage.vue"),
    },
    {
      path: "/sls/invoice/preview/:id",
      component: () => import("pages/areas/sls/invoice/PreviewPage.vue"),
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
      path: "/cmn/productGroup",
      component: () => import("src/pages/areas/cmn/productGroup/IndexPage.vue"),
    },
    {
      path: "/cmn/product",
      component: () => import("src/pages/areas/cmn/product/IndexPage.vue"),
    },
    {
      path: "/cmn/product/preview/:id",
      component: () => import("src/pages/areas/cmn/product/PreviewPage.vue"),
    },
  ],
};
