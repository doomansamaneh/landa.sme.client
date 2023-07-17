export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"), name: "Business", meta: {
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/business/IndexPage.vue") },
    {
      path: "changePassword", name: "Change Password", component: () => import("src/pages/users/ResetPassword.vue"), meta: {
        icon: "password"
      },
    },
    {
      path: "payments/:businessId/:businessTitle", name: "Payments", component: () => import("src/pages/business/PaymentPage.vue"), meta: {
        icon: "payment"

      },
    },
    {
      path: "paymentDetail/:paymentId", name: "Payments Detail", component: () => import("src/pages/business/PaymentDetail.vue"), meta: {
        icon: "o_info"
      },
    },

  ],
}
