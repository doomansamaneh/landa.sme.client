export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"), name: "Business", meta: {
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/management/BusinessPage.vue") },
    {
      path: "changePassword", name: "Change Password", component: () => import("pages/users/ResetPassword.vue"), meta: {
        icon: "password"
      },
    },
    {
      path: "payments/:businessId/:businessTitle", name: "Payments", component: () => import("pages/management/PaymentPage.vue"), meta: {
        icon: "payment"

      },
    },
    {
      path: "paymentDetail/:paymentId", name: "Payments Detail", component: () => import("pages/management/PaymentDetailPage.vue"), meta: {
        icon: "o_info"
      },

    },
    {
      path: "addPayment/:paymentId", name: "Renew Subscription", component: () => import("pages/management/AddPaymentPage.vue"), meta: {
        icon: "o_monetization_on"
      },

    },

  ],
}
