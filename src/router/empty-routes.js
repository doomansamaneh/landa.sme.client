import EmptyLayout from "src/layouts/EmptyLayout.vue";

export default {
  path: "/",
  component: EmptyLayout,
  name: "empty",
  children: [
    {
      path: "cmn/productGroup/create",
      component: () => import("pages/areas/cmn/productGroup/CreatePage.vue"),
    },
    {
      path: "cmn/productGroup/edit/:id",
      component: () => import("pages/areas/cmn/productGroup/EditPage.vue"),
    },
    {
      path: "cmn/productGroup/copy/:id",
      component: () => import("pages/areas/cmn/productGroup/CopyPage.vue"),
    },

    {
      path: "cmn/product/create",
      component: () => import("pages/areas/cmn/product/CreatePage.vue"),
    },
    {
      path: "cmn/product/edit/:id",
      component: () => import("pages/areas/cmn/product/EditPage.vue"),
    },
    {
      path: "cmn/product/copy/:id",
      component: () => import("pages/areas/cmn/product/CopyPage.vue"),
    },


    {
      path: "sls/invoice/create",
      component: () => import("pages/areas/sls/inoice/CreatePage.vue"),
    },
    {
      path: "sls/invoice/create/selectproduct",
      component: () => import("src/components/areas/sls/invoice/create/mobile/SelectProduct.vue"),
    },
    {
      path: "sls/invoice/create/selectproduct/productlookup",
      component: () => import("src/components/areas/sls/invoice/create/mobile/ProductLookup.vue"),
    },
    {
      path: "sls/invoice/createV2",
      component: () => import("pages/areas/sls/inoice/CreateV2Page.vue"),
    },
    {
      path: "sls/invoice/edit/:id",
      component: () => import("pages/areas/sls/invoice/EditPage.vue"),
    },
    {
      path: "sls/invoice/copy/:id",
      component: () => import("pages/areas/sls/invoice/CopyPage.vue"),
    },
    {
      path: "sls/invoice/detail/:id",
      component: () => import("pages/areas/sls/invoice/DetailPage.vue"),
    },

    {
      path: "/settings",
      component: () => import("pages/management/settings/IndexPage.vue"),
    },
  ]
}
