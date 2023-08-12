import authRoutes from "./auth-routes"
import businessRoutes from "./business-routes"
import mainRoutes from "./main-routes"

const routes = [
  {
    path: "/",
    component: () => import("layouts/BusinessLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/management/BusinessPage.vue")
      }
    ]
  },
  { ...authRoutes },
  { ...businessRoutes },
  { ...mainRoutes },

  // catch all redirect to home page
  //{ path: '/:pathMatch(.*)*', redirect: '/' },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]
export default routes
