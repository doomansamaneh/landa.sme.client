export default {
  path: "/business",
  component: () => import("layouts/ManagementLayout.vue"),
  name: "business",
  meta: {
    icon: "business"
  },
  children: [
    {
      path: "/business",
      name: "business",
      component: () => import("src/pages/management/business/IndexPage.vue")
    },
    {
      path: "/business/firstLoginWizard",
      name: "first-login-wizard",
      meta: {
        icon: "celebration"
      },
      component: () => import("src/pages/management/firstLoginWizard_/IndexPage.vue")
    },
    {
      path: "changePassword",
      name: "change-password",
      component: () => import("src/pages/areas/scr/users/ChangePassword.vue"),
      meta: {
        icon: "password"
      }
    },
    {
      path: "inviteUser",
      name: "invite-user",
      component: () => import("pages/management/users/InviteUser.vue"),
      meta: {
        icon: "o_profile"
      }
    },
    {
      path: "deleteBusiness",
      name: "delete-business",
      component: () => import("pages/management/users/DeleteBusiness.vue"),
      meta: {
        icon: "o_delete"
      }
    },
    {
      path: "addBusiness",
      name: "add-new-business",
      component: () => import("pages/management/addBusiness/IndexPage.vue"),
      meta: {
        icon: "o_add"
      }
    },
    {
      path: "payments/:businessId",
      name: "payments",
      component: () => import("src/pages/management/payment/IndexPage.vue"),
      meta: {
        icon: "payment"
      }
    },
    {
      path: "paymentDetail/:paymentId",
      name: "payment-detail",
      component: () => import("pages/management/paymentDetail/IndexPage.vue"),
      meta: {
        icon: "o_info"
      }
    },
    {
      path: "addPayment/:businessId",
      name: "renew-subscription",
      component: () => import("pages/management/addPayment/IndexPage.vue"),
      meta: {
        icon: "o_monetization_on"
      }
    },
    {
      path: "expired/:businessId",
      name: "business-expired",
      component: () => import("pages/management/BusinessExpiredPage.vue"),
      meta: {
        icon: "o_monetization_on"
      }
    },
  ]
}
