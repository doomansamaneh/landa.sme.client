import authRoutes from "./auth-routes"
import businessRoutes from "./business-routes"

const routes = [
  {
    path: "/",
    component: () => import("layouts/BusinessLayout.vue"),
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue")
      }
    ]
  },
  { ...authRoutes },
  { ...businessRoutes },

  // catch all redirect to home page
  //{ path: '/:pathMatch(.*)*', redirect: '/' },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]
export default routes
