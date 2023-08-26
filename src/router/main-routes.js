export default {
  path: "/",
  component: () => import("src/layouts/MainLayout.vue"),
  name: "dashboard",
  meta: {
    icon: "o_dashboard"
  },
  children: [
    {
      path: ":businessId",
      component: () => import("src/pages/management/HomePage.vue")
    },
    {
      path: "sls/quote",
      component: () => import("src/components/areas/sls/quote/IndexView.vue")
    }
  ]
}
