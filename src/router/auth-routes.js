export default {
  path: "/account",
  component: () => import("layouts/AuthLayout.vue"),
  children: [
    { path: "login", component: () => import("pages/auth/LoginPage.vue") },
  ]
}
