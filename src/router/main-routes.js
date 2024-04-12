import MainLayout from "src/layouts/MainLayout.vue";
import HomePage from "src/pages/areas/dashboard/IndexPage.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "dashboard",
  meta: {
    icon: "o_dashboard",
  },
  children: [
    { path: "/", redirect: "/dashboard" },
    {
      path: ":businessId",
      component: HomePage,
    },
    {
      path: "/dashboard",
      component: HomePage,
    },
    {
      path: "acc/fiscalYear",
      children: [
        {
          path: "",
          component: () => import("pages/areas/acc/fiscalYear/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/acc/fiscalYear/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/acc/fiscalYear/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/acc/fiscalYear/CopyPage.vue"),
        },
      ],
    },
    {
      path: "crm/customer",
      children: [
        {
          path: "",
          component: () => import("pages/areas/crm/customer/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/crm/customer/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/crm/customer/EditPage.vue"),
        },
        {
          path: "preview/:id",
          component: () => import("pages/areas/crm/customer/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "crm/job",
      children: [
        {
          path: "",
          component: () => import("pages/areas/crm/job/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/crm/job/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/crm/job/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/crm/job/CopyPage.vue"),
        },
      ],
    },

    {
      path: "crm/contactType",
      children: [
        {
          path: "",
          component: () => import("pages/areas/crm/contactType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/crm/contactType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/crm/contactType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/crm/contactType/CopyPage.vue"),
        },
      ],
    },

    // {
    //   path: "sls/quote",
    //   component: () => import("pages/areas/sls/quote/IndexPage.vue"),
    // },
    {
      path: "sls/invoice",
      children: [
        {
          path: "",
          component: () => import("pages/areas/sls/invoice/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/sls/invoice/CreatePage.vue"),
        },
        {
          path: "createV2",
          component: () => import("pages/areas/sls/invoice/CreateV2Page.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/sls/invoice/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/sls/invoice/CopyPage.vue"),
        },
        {
          path: "detail/:id",
          component: () => import("pages/areas/sls/invoice/DetailPage.vue"),
        },
        {
          path: "remained/:remained",
          component: () =>
            import("pages/areas/sls/invoice/IndexRemainedPage.vue"),
        },
        {
          path: "preview/:id",
          component: () => import("pages/areas/sls/invoice/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "scr/users/settings",
      children: [
        {
          path: "",
          component: () =>
            import("src/pages/management/users/settings/IndexPage.vue"),
        },
        {
          path: "appearance",
          component: () =>
            import(
              "src/pages/management/users/settings/appearance/IndexPage.vue"
            ),
        },
        {
          path: "change-password",
          component: () =>
            import(
              "src/pages/management/users/settings/changePassword/IndexPage.vue"
            ),
        },
      ],
    },

    {
      path: "cmn/bankAccountType",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/bankAccountType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bankAccountType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bankAccountType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bankAccountType/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/bank",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/bank/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/bank/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/bank/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/bank/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/bankBranch",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/bankBranch/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/bankBranch/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/bankBranch/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/bankBranch/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/commonKeyword",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/commonKeyword/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/commonKeyword/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/commonKeyword/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/commonKeyword/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/currency",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/currency/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/currency/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/currency/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/currency/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/location",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/location/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/location/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/location/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/location/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productGroup",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/productGroup/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productGroup/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/productGroup/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/productGroup/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/product",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/product/IndexPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("src/pages/areas/cmn/product/PreviewPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/product/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/product/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/product/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productUnit",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/productUnit/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/productUnit/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/productUnit/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/productUnit/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productUnitRelation",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/productUnitRelation/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productUnitRelation/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/productUnitRelation/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/productUnitRelation/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/vat",
      children: [
        {
          path: "",
          component: () => import("pages/areas/cmn/vat/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/cmn/vat/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/vat/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/vat/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/appConfig",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/appConfig/IndexPage.vue"),
        },
        {
          path: "CompanySetting",
          component: () => import("pages/areas/cmn/appConfig/CompanySettingPage.vue"),
        }
      ],
    },

    {
      path: "inv/inventory",
      children: [
        {
          path: "",
          component: () => import("pages/areas/inv/inventory/IndexPage.vue"),
        },
        {
          path: "create",
          component: () => import("pages/areas/inv/inventory/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/inv/inventory/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/inv/inventory/CopyPage.vue"),
        },
      ],
    },
  ],
};
