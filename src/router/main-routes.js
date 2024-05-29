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
          component: () =>
            import("pages/areas/acc/fiscalYear/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/fiscalYear/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/fiscalYear/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/fiscalYear/CopyPage.vue"),
        },
      ],
    },

    {
      path: "acc/voucher",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/voucher/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/voucher/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/voucher/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/voucher/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/acc/voucher/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "acc/accountCL",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/accountCL/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountCL/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountCL/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountCL/CopyPage.vue"),
        },
      ],
    },

    {
      path: "acc/accountGL",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/accountGL/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountGL/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountGL/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountGL/CopyPage.vue"),
        },
      ],
    },

    {
      path: "acc/accountSL",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/accountSL/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountSL/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountSL/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountSL/CopyPage.vue"),
        },
        {
          path: "tree",
          component: () =>
            import("pages/areas/acc/accountSL/TreePage.vue"),
        },
      ],
    },

    {
      path: "acc/accountDL",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/accountDL/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountDL/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountDL/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountDL/CopyPage.vue"),
        },
      ],
    },

    {
      path: "acc/report",
      children: [
        {
          path: "customer",
          component: () =>
            import("pages/areas/acc/report/CustomerAccountPage.vue"),
        },
        {
          path: "debtors",
          component: () =>
            import("pages/areas/acc/report/DebtorsPage.vue"),
        },
        {
          path: "creditors",
          component: () =>
            import("pages/areas/acc/report/CreditorsPage.vue"),
        },
        {
          path: "review",
          component: () =>
            import("pages/areas/acc/report/AccountReviewPage.vue"),
        },
        {
          path: "journal",
          component: () =>
            import("pages/areas/acc/report/JournalPage.vue"),
        },
      ],
    },

    {
      path: "acc/operation",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/operation/OperationPage.vue"),
        },
      ],
    },

    {
      path: "crm/customer",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/crm/customer/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/customer/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/crm/customer/EditPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/crm/customer/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "crm/job",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/crm/job/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/job/CreatePage.vue"),
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
          component: () =>
            import("pages/areas/crm/contactType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/contactType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/crm/contactType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/crm/contactType/CopyPage.vue"),
        },
      ],
    },

    {
      path: "doc/contract",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/doc/contract/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/doc/contract/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/doc/contract/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/doc/contract/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/doc/contract/PreviewPage.vue"),
        },
      ],
    },
    {
      path: "trs/bankAccount",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/bankAccount/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/bankAccount/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/bankAccount/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/bankAccount/CopyPage.vue"),
        },
      ],
    },

    {
      path: "trs/transferMoney",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/transferMoney/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/transferMoney/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/CopyPage.vue"),
        },
      ],
    },

    {
      path: "trs/cash",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/cash/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/cash/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/cash/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/cash/CopyPage.vue"),
        },
      ],
    },

    {
      path: "sls/quote",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/quote/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/quote/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/quote/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/quote/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/quote/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "sls/invoice",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/invoice/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/invoice/CreatePage.vue"),
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/invoice/CreateV2Page.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/invoice/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/invoice/CopyPage.vue"),
        },
        {
          path: "createFromQuote/:id",
          component: () =>
            import("pages/areas/sls/invoice/CreateFromQuotePage.vue"),
        },
        {
          path: "remained/:remained",
          component: () =>
            import("pages/areas/sls/invoice/IndexRemainedPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/invoice/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "sls/purchase",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/purchase/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/purchase/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/purchase/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/purchase/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/purchase/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "sls/salesReturn",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/salesReturn/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/salesReturn/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/CopyPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/PreviewPage.vue"),
        },
        {
          path: "createFromInvoice/:id",
          component: () =>
            import(
              "pages/areas/sls/salesReturn/CreateFromInvoicePage.vue"
            ),
        },
      ],
    },

    {
      path: "sls/saleType",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/saleType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/saleType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/saleType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/saleType/CopyPage.vue"),
        },
      ],
    },

    {
      path: "sls/purchaseType",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/purchaseType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/purchaseType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/purchaseType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/purchaseType/CopyPage.vue"),
        },
      ],
    },

    {
      path: "scr/users/settings",
      children: [
        {
          path: "",
          component: () =>
            import(
              "src/pages/management/users/settings/IndexPage.vue"
            ),
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
          component: () =>
            import("pages/areas/cmn/bank/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bank/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bank/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bank/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/bankBranch",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/bankBranch/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bankBranch/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bankBranch/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bankBranch/CopyPage.vue"),
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
          component: () =>
            import("pages/areas/cmn/commonKeyword/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/commonKeyword/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/currency",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/currency/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/currency/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/currency/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/currency/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/location",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/location/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/location/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/location/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/location/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productGroup",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/productGroup/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productGroup/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/productGroup/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/productGroup/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/product",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/product/IndexPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("src/pages/areas/cmn/product/PreviewPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/product/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/product/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/product/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productUnit",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/productUnit/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productUnit/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/productUnit/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/productUnit/CopyPage.vue"),
        },
      ],
    },

    {
      path: "cmn/productUnitRelation",
      children: [
        {
          path: "",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/IndexPage.vue"
            ),
        },
        {
          path: "create",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/CreatePage.vue"
            ),
        },
        {
          path: "edit/:id",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/EditPage.vue"
            ),
        },
        {
          path: "copy/:id",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/CopyPage.vue"
            ),
        },
      ],
    },

    {
      path: "cmn/vat",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/cmn/vat/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/vat/CreatePage.vue"),
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
          path: "basicInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/BasicInfoPage.vue"),
        },
        {
          path: "contactInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/ContactInfoPage.vue"),
        },
        {
          path: "VATInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/VATInfoPage.vue"),
        },
        {
          path: "insuranceInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/InsuranceInfoPage.vue"),
        },
        {
          path: "salaryInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/SalaryInfoPage.vue"),
        },
        {
          path: "salesInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/SalesInfoPage.vue"),
        },
        {
          path: "logoInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/LogoInfoPage.vue"),
        },
      ],
    },

    {
      path: "inv/inventory",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/inventory/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/inventory/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/inventory/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/inventory/CopyPage.vue"),
        },
      ],
    },

    {
      path: "inv/closeOrder",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/closeOrder/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/closeOrder/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/closeOrder/EditPage.vue"),
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/closeOrder/PreviewPage.vue"),
        },
      ],
    },

    {
      path: "inv/report",
      children: [
        {
          path: "productStock",
          component: () =>
            import("pages/areas/inv/report/ProductStockPage.vue"),
        },
        {
          path: "productStock/preview/:productId",
          component: () =>
            import(
              "pages/areas/inv/report/ProductStockPreviewPage.vue"
            ),
        },
      ],
    },

    {
      path: "sls/report",
      children: [
        {
          path: "productStock",
          component: () =>
            import("pages/areas/inv/report/ProductStockPage.vue"),
        },
        {
          path: "salesReview",
          component: () =>
            import("pages/areas/sls/report/SalesReviewPage.vue"),
        },
      ],
    },

    {
      path: "org/org",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/org/org/IndexPage.vue"),
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/org/org/EditPage.vue"),
        },
      ],
    },

    {
      path: "org/unit",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/org/unit/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/org/unit/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/org/unit/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/org/unit/CopyPage.vue"),
        },
      ],
    },

    {
      path: "org/unitType",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/org/unitType/IndexPage.vue"),
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/org/unitType/CreatePage.vue"),
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/org/unitType/EditPage.vue"),
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/org/unitType/CopyPage.vue"),
        },
      ],
    },
  ],
};
