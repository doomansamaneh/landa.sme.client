export default {
  path: "/business",
  component: () => import("layouts/BusinessLayout.vue"),
  name: "business",
  meta: {
    icon: "business"
  },
  children: [
    { path: "", component: () => import("pages/management/BusinessPage.vue") },
    {
      path: "changePassword",
      name: "change-password",
      component: () => import("src/pages/users/ChangePassword.vue"),
      meta: {
        icon: "password"
      }
    },
    {
      path: "inviteUser",
      name: "invite-user",
      component: () => import("pages/users/InviteUser.vue"),
      meta: {
        icon: "o_profile"
      }
    },
    {
      path: "deleteBusiness",
      name: "delete-business",
      component: () => import("pages/users/DeleteBusiness.vue"),
      meta: {
        icon: "o_delete"
      }
    },
    {
      path: "addBusiness",
      name: "add-new-business",
      component: () => import("pages/management/AddBusiness.vue"),
      meta: {
        icon: "o_add"
      }
    },
    {
      path: "payments/:businessId",
      name: "payments",
      component: () => import("pages/management/PaymentPage.vue"),
      meta: {
        icon: "payment"
      }
    },
    {
      path: "paymentDetail/:paymentId",
      name: "payment-detail",
      component: () => import("pages/management/PaymentDetailPage.vue"),
      meta: {
        icon: "o_info"
      }
    },
    {
      path: "addPayment/:businessId",
      name: "renew-subscription",
      component: () => import("pages/management/AddPaymentPage.vue"),
      meta: {
        icon: "o_monetization_on"
      }
    },
    {
      path: "expired/:businessId",
      name: "business-expired",
      component: () => import("src/pages/management/BusinessExpiredPage.vue"),
      meta: {
        icon: "o_monetization_on"
      }
    }
  ]
}
