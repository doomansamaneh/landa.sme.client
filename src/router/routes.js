import authRoutes from "./auth-routes"
import managementRoutes from "./management-routes"
import mainRoutes from "./main-routes"

const routes = [
  { ...authRoutes },
  { ...managementRoutes },
  { ...mainRoutes },

  // catch all redirect to home page
  //{ path: '/:pathMatch(.*)*', redirect: '/' },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue")
  }
]
export default routes
