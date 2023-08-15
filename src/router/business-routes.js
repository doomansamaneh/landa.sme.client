export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"), name: "Business", meta: {
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/management/BusinessPage.vue") },
    {
      path: "changePassword", name: "Change Password", component: () => import("src/pages/users/ChangePassword.vue"), meta: {
        icon: "password"
      },
    },
    {
      path: "inviteUser", name: "Invite User", component: () => import("pages/users/InviteUser.vue"), meta: {
        icon: "o_profile"
      },
    },
    {
      path: "deleteBusiness", name: "Delete Business", component: () => import("pages/users/DeleteBusiness.vue"), meta: {
        icon: "o_delete"
      },
    },
    {
      path: "addBusiness", name: "Add New Business", component: () => import("pages/management/AddBusinessPage.vue"), meta: {
        icon: "o_add"
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
      path: "addPayment/:businessId/:businessTitle/:planTitle", name: "Renew Subscription", component: () => import("pages/management/AddPaymentPage.vue"), meta: {
        icon: "o_monetization_on"
      },

    },

  ],
}
