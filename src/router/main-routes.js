export default {
  path: "/",
  component: () => import("src/layouts/MainLayout.vue"),
  name: "",
  meta: {
    icon: "home"
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
