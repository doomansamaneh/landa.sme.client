import MainLayout from "src/layouts/MainLayout.vue";
import ProfilePage from "src/pages/management/ProfilePage.vue";
import HomePage from "src/pages/areas/dashboard/IndexPage.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "dashboard",
  meta: {
    icon: "o_dashboard",
  },
  children: [
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
      component: ProfilePage,
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
      path: "/settings",
      children: [
        {
          path: "",
          component: () => import("src/pages/management/users/settings/IndexPage.vue"),
        },
        {
          path: "appearance",
          component: () => import("src/pages/management/users/settings/appearance/IndexPage.vue"),
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
  ],
};
