export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"), name: "Business", meta: {
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/business/IndexPage.vue") },
    {
      path: "changePassword", name: "Change Password", component: () => import("pages/users/ResetPasswordSave.vue"), meta: {
        icon: "password"
      },
    },
    {
      path: "payments", name: "Payments", component: () => import("pages/business/PaymentsPage.vue"), meta: {
        icon: "payment"
      },
    }
  ],
}
