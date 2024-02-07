import EmptyLayout from "src/layouts/EmptyLayout.vue";

export default {
  path: "/",
  component: EmptyLayout,
  name: "empty",
  children: [
    {
      path: "cmn/productGroup/create",
      component: () => import("src/pages/areas/cmn/productGroup/CreatePage.vue"),
    },
    {
      path: "cmn/productGroup/edit/:id",
      component: () => import("src/pages/areas/cmn/productGroup/EditPage.vue"),
    },
    {
      path: "cmn/productGroup/copy/:id",
      component: () => import("src/pages/areas/cmn/productGroup/CopyPage.vue"),
    },
    {
      path: "cmn/product/create",
      component: () => import("src/pages/areas/cmn/product/CreatePage.vue"),
    },
    {
      path: "cmn/product/edit/:id",
      component: () => import("src/pages/areas/cmn/product/EditPage.vue"),
    },
    {
      path: "cmn/product/copy/:id",
      component: () => import("src/pages/areas/cmn/product/CopyPage.vue"),
    },
    {
      path: "/settings",
      component: () => import("src/pages/management/settings/IndexPage.vue"),
    },
  ]
}
