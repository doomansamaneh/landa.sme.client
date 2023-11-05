export default {
  path: "/",
  component: () => import("src/layouts/MainLayout.vue"),
  name: "dashboard",
  meta: {
    icon: "o_dashboard"
  },
  children: [
    {
      path: "/crm/customer",
      component: () => import("src/pages/management/ProfilePage.vue")
    },
    {
      path: ":businessId",
      component: () => import("src/pages/management/HomePage.vue")
    },
    {
      path: "sls/quote",
      component: () => import("src/components/areas/sls/quote/IndexView.vue")
    }
    ,
    {
      path: "sls/invoice",
      component: () => import("src/components/areas/sls/invoice/IndexView.vue"),
    },
    {
      path: "sls/invoice/create",
      component: () => import("src/components/areas/sls/invoice/CreateInvoice.vue"),
    },
    {
      path: "sls/invoice2/create",
      component: () => import("src/components/areas/sls/invoice/CreateInvoiceV2.vue"),
    }
  ]
}
