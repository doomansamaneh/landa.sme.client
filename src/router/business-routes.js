export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"), meta: {
    breadcrumb: "Business",
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/business/IndexPage.vue") },
    { path: "changePassword", component: () => import("pages/users/ResetPasswordSave.vue") },
    { path: "payments", component: () => import("pages/business/PaymentsPage.vue") }
  ],
}
