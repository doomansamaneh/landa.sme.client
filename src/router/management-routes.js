export default {
  path: "/business",
  name: "business",
  component: () => import("layouts/ManagementLayout.vue"),
  meta: {
    icon: "business",
  },
  children: [
    {
      path: "",
      name: "business-index",

      component: () => import("src/pages/management/business/IndexPage.vue"),
    },
    {
      path: "/business/firstLoginWizard",
      name: "first-login-wizard",
      meta: {
        icon: "celebration",
      },
      component: () =>
        import("src/pages/management/firstLoginWizard_/IndexPage.vue"),
    },
    {
      path: "changePassword",
      name: "change-password",
      component: () =>
        import("src/pages/areas/scr/users/ChangePasswordPage.vue"),
      meta: {
        icon: "password",
      },
    },

    {
      path: "deleteBusiness",
      name: "delete-business",
      component: () =>
        import("pages/management/business/DeleteBusinessPage.vue"),
      meta: {
        icon: "o_delete",
      },
    },
    {
      path: "addBusiness",
      name: "add-new-business",
      component: () => import("pages/management/business/AddBusinessPage.vue"),
      meta: {
        icon: "o_add",
      },
    },
    {
      path: "payments/:businessId",
      name: "payments",
      component: () => import("src/pages/management/payment/IndexPage.vue"),
      meta: {
        icon: "payment",
      },
    },
    {
      path: "paymentDetail/:paymentId",
      name: "payment-detail",
      component: () => import("pages/management/payment/DetailPage.vue"),
      meta: {
        icon: "o_info",
      },
    },
    {
      path: "addPayment/:businessId",
      name: "renew-subscription",
      component: () => import("pages/management/payment/AddPaymentPage.vue"),
      meta: {
        icon: "o_monetization_on",
      },
    },
    {
      path: "expired/:businessId",
      name: "business-expired",
      component: () =>
        import("pages/management/business/BusinessExpiredPage.vue"),
      meta: {
        icon: "o_monetization_on",
      },
    },
  ],
};
