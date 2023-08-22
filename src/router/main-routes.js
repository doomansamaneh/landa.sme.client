export default {
  path: "/home",
  component: () => import("src/layouts/MainLayout.vue"),
  name: "Home",
  meta: {
    icon: "home"
  },
  children: [
    {
      path: ":businessId",
      component: () => import("src/pages/management/HomePage.vue")
    },
    {
      path: "proformas",
      component: () => import("src/pages/management/ProformaPage.vue")
    }
  ]
}
