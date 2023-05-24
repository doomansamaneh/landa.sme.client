export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"),
  children: [
    { path: "", component: () => import("pages/business/IndexPage.vue") },
    { path: "changePassword", component: () => import("pages/users/ResetPasswordSave.vue") }
  ]
}
