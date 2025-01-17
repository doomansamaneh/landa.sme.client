export default {
  path: "/",
  component: () => import("src/layouts/MainLayout.vue"),
  name: "dashboard",
  meta: {
    icon: "o_dashboard",
  },
  children: [
    {
      path: "/",
      component: () =>
        import("src/pages/areas/dashboard/IndexPage.vue"),
    },
    //{ path: "/", redirect: "/dashboard" },
    {
      path: ":businessId",
      component: () =>
        import("src/pages/areas/dashboard/IndexPage.vue"),
    },
    {
      path: "/dashboard",
      component: () =>
        import("src/pages/areas/dashboard/IndexPage.vue"),
      // meta: { title: "پیشخوان" },
    },

    {
      path: "acc/fiscalYear",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/acc/fiscalYear/IndexPage.vue"),
          meta: { title: "سال مالی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/fiscalYear/CreatePage.vue"),
          meta: { title: "سال مالی -ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/fiscalYear/EditPage.vue"),
          meta: { title: "سال مالی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/fiscalYear/CopyPage.vue"),
          meta: { title: "سال مالی - کپی" },
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
          meta: { title: "اسناد حسابداری" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/voucher/CreatePage.vue"),
          meta: { title: "سند حسابداری - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/voucher/EditPage.vue"),
          meta: { title: "سند حسابداری - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/voucher/CopyPage.vue"),
          meta: { title: "سند حسابداری - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/acc/voucher/PreviewPage.vue"),
          meta: { title: "سند حسابداری - پیش نمایش" },
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
          meta: { title: "حساب کل" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountCL/CreatePage.vue"),
          meta: { title: "حساب کل - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountCL/EditPage.vue"),
          meta: { title: "حساب کل - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountCL/CopyPage.vue"),
          meta: { title: "حساب کل - کپی" },
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
          meta: { title: "گروه حساب" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountGL/CreatePage.vue"),
          meta: { title: "گروه حساب - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountGL/EditPage.vue"),
          meta: { title: "گروه حساب - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountGL/CopyPage.vue"),
          meta: { title: "گروه حساب - کپی" },
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
          meta: { title: "حسابهای معین" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountSL/CreatePage.vue"),
          meta: { title: "حساب معین - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountSL/EditPage.vue"),
          meta: { title: "حساب معین - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountSL/CopyPage.vue"),
          meta: { title: "حساب معین - کپی" },
        },
        {
          path: "tree",
          component: () =>
            import("pages/areas/acc/accountSL/TreePage.vue"),
          meta: { title: "سرفصل حسابها" },
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
          meta: { title: "حسابهای تفصیلی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/acc/accountDL/CreatePage.vue"),
          meta: { title: "حساب تفصیلی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/acc/accountDL/EditPage.vue"),
          meta: { title: "حساب تفصیلی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/acc/accountDL/CopyPage.vue"),
          meta: { title: "حساب تفصیلی - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/acc/accountDL/PreviewPage.vue"),
          meta: { title: "حساب تفصیلی - پیش نمایش" },
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
          meta: { title: "گزارش حساب شخص" },
        },
        {
          path: "customer/preview",
          component: () =>
            import(
              "pages/areas/acc/report/Preview/CustomerAccountPreviewPage.vue"
            ),
          meta: { title: "گزارش حساب شخص" },
        },
        {
          path: "debtors",
          component: () =>
            import("pages/areas/acc/report/DebtorsPage.vue"),
          meta: { title: "گزارش بدهکاران" },
        },
        {
          path: "creditors",
          component: () =>
            import("pages/areas/acc/report/CreditorsPage.vue"),
          meta: { title: "گزارش بستانکاران" },
        },
        {
          path: "review",
          component: () =>
            import("pages/areas/acc/report/AccountReviewPage.vue"),
          meta: { title: "گزارش مرور حساب" },
        },
        {
          path: "CLPreview",
          component: () =>
            import(
              "pages/areas/acc/report/preview/CLPreviewPage.vue"
            ),
          meta: { title: "تراز آزمایشی - گروه حساب" },
        },
        {
          path: "GLPreview",
          component: () =>
            import(
              "pages/areas/acc/report/preview/GLPreviewPage.vue"
            ),
          meta: { title: "تراز آزمایشی - حساب کل" },
        },
        {
          path: "SLPreview",
          component: () =>
            import(
              "pages/areas/acc/report/preview/SLPreviewPage.vue"
            ),
          meta: { title: "تراز آزمایشی - حساب معین" },
        },
        {
          path: "DLPreview",
          component: () =>
            import(
              "pages/areas/acc/report/preview/DLPreviewPage.vue"
            ),
          meta: { title: "تراز آزمایشی - حساب تفصیلی" },
        },
        {
          path: "ItemPreview",
          component: () =>
            import(
              "pages/areas/acc/report/preview/ItemPreviewPage.vue"
            ),
          meta: { title: "تراز آزمایشی - ریز گردش" },
        },
        {
          path: "trialBalance",
          component: () =>
            import("pages/areas/acc/report/TrialBalancePage.vue"),
          meta: { title: "تراز آزمایشی" },
        },
        {
          path: "journal",
          component: () =>
            import("pages/areas/acc/report/JournalPage.vue"),
          meta: { title: "گزارش دفتر روزنامه" },
        },
        {
          path: "incomeStatement",
          component: () =>
            import("pages/areas/acc/report/IncomeStatementPage.vue"),
          meta: { title: "گزارش صورت سود و زیان" },
        },
        {
          path: "balanceSheet",
          component: () =>
            import("pages/areas/acc/report/BalanceSheetPage.vue"),
          meta: { title: "گزارش ترازنامه" },
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
          meta: { title: "عملیات حسابداری" },
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
          meta: { title: "مخاطبان، اشخاص" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/customer/CreatePage.vue"),
          meta: { title: "مخاطب - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/crm/customer/EditPage.vue"),
          meta: { title: "مخاطب - ویرایش" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/crm/customer/PreviewPage.vue"),
          meta: { title: "مخاطب - پیش نمایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/crm/customer/CopyPage.vue"),
          meta: { title: "مخاطب - کپی مخاطب" },
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
          meta: { title: "شغل" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/job/CreatePage.vue"),
          meta: { title: "شغل - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/crm/job/EditPage.vue"),
          meta: { title: "شغل - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/crm/job/CopyPage.vue"),
          meta: { title: "شغل - ویرایش" },
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
          meta: { title: "انواع تماس" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/crm/contactType/CreatePage.vue"),
          meta: { title: "نوع تماس - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/crm/contactType/EditPage.vue"),
          meta: { title: "نوع تماس - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/crm/contactType/CopyPage.vue"),
          meta: { title: "نوع تماس - کپی" },
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
          meta: { title: "قراردادها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/doc/contract/CreatePage.vue"),
          meta: { title: "قرارداد - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/doc/contract/EditPage.vue"),
          meta: { title: "قرارداد - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/doc/contract/CopyPage.vue"),
          meta: { title: "قرارداد - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/doc/contract/PreviewPage.vue"),
          meta: { title: "قرارداد - پیش نمایش" },
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
          meta: { title: "حسابهای بانکی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/bankAccount/CreatePage.vue"),
          meta: { title: "حساب بانکی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/bankAccount/EditPage.vue"),
          meta: { title: "حساب بانکی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/bankAccount/CopyPage.vue"),
          meta: { title: "حساب بانکی - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/bankAccount/PreviewPage.vue"),
          meta: { title: "حساب بانکی - پیش نمایش" },
        },
      ],
    },

    {
      path: "trs/bill",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/bill/IndexPage.vue"),
          meta: { title: "هزینه‌ها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/bill/CreatePage.vue"),
          meta: { title: "هزینه - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/bill/EditPage.vue"),
          meta: { title: "هزینه - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/bill/CopyPage.vue"),
          meta: { title: "هزینه - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/bill/PreviewPage.vue"),
          meta: { title: "هزینه - پیش نمایش" },
        },
      ],
    },

    {
      path: "trs/receipt",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/receipt/IndexPage.vue"),
          meta: { title: "دریافتها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/receipt/CreatePage.vue"),
          meta: { title: "دریافت - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/receipt/EditPage.vue"),
          meta: { title: "دریافت - ویرایش" },
        },
        {
          path: "createFromInvoice/:id",
          component: () =>
            import(
              "pages/areas/trs/receipt/CreateFromInvoicePage.vue"
            ),
          meta: { title: "دریافت - ایجاد از روی فاکتور" },
        },
        // {
        //   path: "copy/:id",
        //   component: () =>
        //     import("pages/areas/trs/receipt/CopyPage.vue"),
        // },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/receipt/PreviewPage.vue"),
          meta: { title: "دریافت - پیش نمایش" },
        },
      ],
    },

    {
      path: "trs/payment",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/trs/payment/IndexPage.vue"),
          meta: { title: "پرداختها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/payment/CreatePage.vue"),
          meta: { title: "پرداخت - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/payment/EditPage.vue"),
          meta: { title: "پرداخت - ویرایش" },
        },
        {
          path: "createFromInvoice/:id",
          component: () =>
            import(
              "pages/areas/trs/payment/CreateFromInvoicePage.vue"
            ),
          meta: { title: "پرداخت - ایجاد از روی خرید" },
        },
        // {
        //   path: "copy/:id",
        //   component: () =>
        //     import("pages/areas/trs/payment/CopyPage.vue"),
        // },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/payment/PreviewPage.vue"),
          meta: { title: "پرداخت - پیش نمایش" },
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
          meta: { title: "فهرست انتقال وجه" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/transferMoney/CreatePage.vue"),
          meta: { title: "انتقال وجه - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/EditPage.vue"),
          meta: { title: "انتقال وجه - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/CopyPage.vue"),
          meta: { title: "انتقال وجه - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/trs/transferMoney/PreviewPage.vue"),
          meta: { title: "انتقال وجه - کپی" },
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
          meta: { title: "صندوقهای نقدی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/trs/cash/CreatePage.vue"),
          meta: { title: "صندوق نقدی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/trs/cash/EditPage.vue"),
          meta: { title: "صندوق نقدی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/trs/cash/CopyPage.vue"),
          meta: { title: "صندوق نقدی - کپی" },
        },
      ],
    },

    {
      path: "trs/report",
      children: [
        {
          path: "checkItem",
          component: () =>
            import("pages/areas/trs/report/CheckItemPage.vue"),
          meta: { title: "گزارش چک" },
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
          meta: { title: "فهرست پیش‌فاکتورها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/quote/CreatePage.vue"),
          meta: { title: "پیش‌فاکتور - ایجاد" },
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/quote/CreateV2Page.vue"),
          meta: { title: "پیش‌فاکتور - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/quote/EditPage.vue"),
          meta: { title: "پیش‌فاکتور - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/quote/CopyPage.vue"),
          meta: { title: "پیش‌فاکتور - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/quote/PreviewPage.vue"),
          meta: { title: "پیش‌فاکتور - پیش‌نمایش" },
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
          meta: { title: "فهرست فاکتورهای فروش" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/invoice/CreatePage.vue"),
          meta: { title: "فاکتور فروش - ایجاد" },
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/invoice/CreateV2Page.vue"),
          meta: { title: "فاکتور فروش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/invoice/EditPage.vue"),
          meta: { title: "فاکتور فروش - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/invoice/CopyPage.vue"),
          meta: { title: "فاکتور فروش - کپی" },
        },
        {
          path: "createFromQuote/:id",
          component: () =>
            import("pages/areas/sls/invoice/CreateFromQuotePage.vue"),
          meta: { title: "فاکتور فروش- تبدیل از پیش‌فاکتور" },
        },
        {
          path: "remained/:remained",
          component: () =>
            import("pages/areas/sls/invoice/IndexRemainedPage.vue"),
          meta: { title: "فاکتورهای فروش - مانده" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/invoice/PreviewPage.vue"),
          meta: { title: "فاکتور فروش - پیش نمایش" },
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
          meta: { title: "فهرست فاکتورهای خرید" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/purchase/CreatePage.vue"),
          meta: { title: "فاکتور خرید - ایجاد" },
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/purchase/CreateV2Page.vue"),
          meta: { title: "فاکتور خرید - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/purchase/EditPage.vue"),
          meta: { title: "فاکتور خرید - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/purchase/CopyPage.vue"),
          meta: { title: "فاکتور خرید - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/purchase/PreviewPage.vue"),
          meta: { title: "فاکتور خرید - پیش نمایش" },
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
          meta: { title: "فهرست برگشت از فروشها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/salesReturn/CreatePage.vue"),
          meta: { title: "برگشت از فروش - ایجاد" },
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/salesReturn/CreateV2Page.vue"),
          meta: { title: "برگشت از فروش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/EditPage.vue"),
          meta: { title: "برگشت از فروش - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/CopyPage.vue"),
          meta: { title: "برگشت از فروش - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/salesReturn/PreviewPage.vue"),
          meta: { title: "برگشت از فروش - پیش نمایش" },
        },
        {
          path: "createFromInvoice/:id",
          component: () =>
            import(
              "pages/areas/sls/salesReturn/CreateFromInvoicePage.vue"
            ),
          meta: { title: "برگشت از فروش - ایجاد از فاکتور فروش" },
        },
      ],
    },

    {
      path: "sls/purchaseReturn",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/sls/purchaseReturn/IndexPage.vue"),
          meta: { title: "فهرست برگشت از خریدها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/purchaseReturn/CreatePage.vue"),
          meta: { title: "برگشت از خرید - ایجاد" },
        },
        {
          path: "createV2",
          component: () =>
            import("pages/areas/sls/purchaseReturn/CreateV2Page.vue"),
          meta: { title: "برگشت از خرید - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/purchaseReturn/EditPage.vue"),
          meta: { title: "برگشت از خرید - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/purchaseReturn/CopyPage.vue"),
          meta: { title: "برگشت از خرید - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/sls/purchaseReturn/PreviewPage.vue"),
          meta: { title: "برگشت از خرید - پیش نمایش" },
        },
        {
          path: "createFromInvoice/:id",
          component: () =>
            import(
              "pages/areas/sls/purchaseReturn/CreateFromInvoicePage.vue"
            ),
          meta: { title: "برگشت از خرید - ایجاد از فاکتور خرید" },
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
          meta: { title: "انواع فروش" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/saleType/CreatePage.vue"),
          meta: { title: "نوع فروش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/saleType/EditPage.vue"),
          meta: { title: "نوع فروش - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/saleType/CopyPage.vue"),
          meta: { title: "نوع فروش - کپی" },
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
          meta: { title: "انواع خرید" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/sls/purchaseType/CreatePage.vue"),
          meta: { title: "نوع خرید - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/sls/purchaseType/EditPage.vue"),
          meta: { title: "نوع خرید - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/sls/purchaseType/CopyPage.vue"),
          meta: { title: "نوع خرید - کپی" },
        },
      ],
    },

    {
      path: "scr/users",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/scr/users/IndexPage.vue"),
          meta: { title: "فهرست کاربران" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/scr/users/CreatePage.vue"),
          meta: { title: "دعوت از کاربر" },
        },
        {
          path: "settings",
          children: [
            {
              path: "",
              component: () =>
                import("src/pages/management/users/SettingPage.vue"),
              meta: { title: "تنظیمات شخصی" },
            },
            {
              path: "theme",
              component: () =>
                import("src/pages/management/users/ThemePage.vue"),
              meta: { title: "تنظیمات - انتخاب تم" },
            },
            {
              path: "changePassword",
              component: () =>
                import(
                  "src/pages/areas/scr/users/ChangePasswordPage.vue"
                ),
              meta: { title: "تغییر گذر واژه" },
            },
          ],
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
          meta: { title: "انواع حساب بانکی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bankAccountType/CreatePage.vue"),
          meta: { title: "نوع حساب بانکی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bankAccountType/EditPage.vue"),
          meta: { title: "نوع حساب بانکی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bankAccountType/CopyPage.vue"),
          meta: { title: "نوع حساب بانکی - ویرایش" },
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
          meta: { title: "فهرست بانکها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bank/CreatePage.vue"),
          meta: { title: "بانک - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bank/EditPage.vue"),
          meta: { title: "بانک - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bank/CopyPage.vue"),
          meta: { title: "بانک - کپی" },
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
          meta: { title: "فهرست شعب بانکی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/bankBranch/CreatePage.vue"),
          meta: { title: "شعبه بانک - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/bankBranch/EditPage.vue"),
          meta: { title: "شعبه بانک - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/bankBranch/CopyPage.vue"),
          meta: { title: "شعبه بانک - کپی" },
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
          meta: { title: "واژگان کلیدی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/commonKeyword/CreatePage.vue"),
          meta: { title: "واژه کلیدی: ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/commonKeyword/EditPage.vue"),
          meta: { title: "واژه کلیدی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/commonKeyword/CopyPage.vue"),
          meta: { title: "واژه کلیدی - کپی" },
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
          meta: { title: "فهرست ارزها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/currency/CreatePage.vue"),
          meta: { title: "ارز - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/currency/EditPage.vue"),
          meta: { title: "ارز - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/currency/CopyPage.vue"),
          meta: { title: "ارز - کپی" },
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
          meta: { title: "محلهای جغرافیایی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/location/CreatePage.vue"),
          meta: { title: "محل جغرافیایی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/location/EditPage.vue"),
          meta: { title: "محل جغرافیایی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/location/CopyPage.vue"),
          meta: { title: "محل جغرافیایی - کپی" },
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
          meta: { title: "فهرست گروه‌های کالا" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productGroup/CreatePage.vue"),
          meta: { title: "گروه کالا - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/productGroup/EditPage.vue"),
          meta: { title: "گروه کالا - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/productGroup/CopyPage.vue"),
          meta: { title: "گروه کالا - کپی" },
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
          meta: { title: "فهرست کالاها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/product/CreatePage.vue"),
          meta: { title: "کالا - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/product/EditPage.vue"),
          meta: { title: "کالا - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/product/CopyPage.vue"),
          meta: { title: "کالا - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/cmn/product/PreviewPage.vue"),
          meta: { title: "کالا - پیش نمایش" },
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
          meta: { title: "فهرست واحدهای سنجش" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/productUnit/CreatePage.vue"),
          meta: { title: "واحد سنجش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/cmn/productUnit/EditPage.vue"),
          meta: { title: "واحد سنجش - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/cmn/productUnit/CopyPage.vue"),
          meta: { title: "واحد سنجش - کپی" },
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
          meta: { title: "ارتباط واحدهای سنجش" },
        },
        {
          path: "create",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/CreatePage.vue"
            ),
          meta: { title: "ارتباط واحد سنجش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/EditPage.vue"
            ),
          meta: { title: "ارتباط واحد سنجش - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import(
              "pages/areas/cmn/productUnitRelation/CopyPage.vue"
            ),
          meta: { title: "ارتباط واحد سنجش - کپی" },
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
          meta: { title: "انواع ارزش افزوده" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/cmn/vat/CreatePage.vue"),
          meta: { title: "انواع ارزش افزوده - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/cmn/vat/EditPage.vue"),
          meta: { title: "انواع ارزش افزوده - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () => import("pages/areas/cmn/vat/CopyPage.vue"),
          meta: { title: "انواع ارزش افزوده - کپی" },
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
          meta: { title: "پیکربندی سامانه" },
        },
        {
          path: "basicInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/BasicInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - اطلاعات اصلی" },
        },
        {
          path: "contactInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/ContactInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - تماس" },
        },
        {
          path: "VATInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/VATInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - مالیات" },
        },
        {
          path: "salaryInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/SalaryInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - حقوق و دستمزد" },
        },
        {
          path: "salesInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/SalesInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - بازرگانی" },
        },
        {
          path: "logoInfo",
          component: () =>
            import("pages/areas/cmn/appConfig/LogoInfoPage.vue"),
          meta: { title: "پیکربندی سامانه - لوگو" },
        },
        {
          path: "import",
          component: () =>
            import("pages/areas/cmn/appConfig/ImportPage.vue"),
          meta: { title: "پیکربندی سامانه - ورود اطلاعات" },
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
          meta: { title: "فهرست انبارها" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/inventory/CreatePage.vue"),
          meta: { title: "انبار - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/inventory/EditPage.vue"),
          meta: { title: "انبار - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/inventory/CopyPage.vue"),
          meta: { title: "انبار - کپی" },
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
          meta: { title: "فهرست بستن حسابهای سفارش کالا" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/closeOrder/CreatePage.vue"),
          meta: { title: "بستن حساب سفارش - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/closeOrder/EditPage.vue"),
          meta: { title: "بستن حساب سفارش - ویرایش" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/closeOrder/PreviewPage.vue"),
          meta: { title: "بستن حساب سفارش - پیش نمایش" },
        },
      ],
    },

    {
      path: "inv/reposition",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/reposition/IndexPage.vue"),
          meta: { title: "فهرست حواله‌های انتقال" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/reposition/CreatePage.vue"),
          meta: { title: "حواله انتقال - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/reposition/EditPage.vue"),
          meta: { title: "حواله انتقال - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/reposition/CopyPage.vue"),
          meta: { title: "حواله انتقال - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/reposition/PreviewPage.vue"),
          meta: { title: "حواله انتقال - پیش نمایش" },
        },
      ],
    },

    {
      path: "inv/production",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/production/IndexPage.vue"),
          meta: { title: "فهرست تولید" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/production/CreatePage.vue"),
          meta: { title: "تولید - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/production/EditPage.vue"),
          meta: { title: "تولید - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/production/CopyPage.vue"),
          meta: { title: "تولید - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/production/PreviewPage.vue"),
          meta: { title: "تولید - پیش نمایش" },
        },
      ],
    },

    {
      path: "inv/openingStock",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/openingStock/IndexPage.vue"),
          meta: { title: "فهرست موجودی اول دوره" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/openingStock/CreatePage.vue"),
          meta: { title: "موجودی اول دوره - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/openingStock/EditPage.vue"),
          meta: { title: "موجودی اول دوره - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/openingStock/CopyPage.vue"),
          meta: { title: "موجودی اول دوره - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/openingStock/PreviewPage.vue"),
          meta: { title: "موجودی اول دوره - پیش نمایش" },
        },
      ],
    },

    {
      path: "inv/modifyStock",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/inv/modifyStock/IndexPage.vue"),
          meta: { title: "فهرست اصلاح موجودی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/inv/modifyStock/CreatePage.vue"),
          meta: { title: "اصلاح موجودی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/inv/modifyStock/EditPage.vue"),
          meta: { title: "اصلاح موجودی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/inv/modifyStock/CopyPage.vue"),
          meta: { title: "اصلاح موجودی - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/inv/modifyStock/PreviewPage.vue"),
          meta: { title: "اصلاح موجودی - پیش نمایش" },
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
          meta: { title: "گزارش موجودی کالا" },
        },
        {
          path: "productStock/preview/:productId",
          component: () =>
            import(
              "pages/areas/inv/report/ProductStockPreviewPage.vue"
            ),
          meta: { title: "گزارش موجودی کالا - پیش نمایش" },
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
          meta: { title: "گزارش موجودی کالا" },
        },
        {
          path: "salesReview",
          component: () =>
            import("pages/areas/sls/report/SalesReviewPage.vue"),
          meta: { title: "گزارش مرور فروش" },
        },
        {
          path: "purchaseReview",
          component: () =>
            import("pages/areas/sls/report/PurchaseReviewPage.vue"),
          meta: { title: "گزارش مرور خرید" },
        },
        {
          path: "taxReport",
          component: () =>
            import("pages/areas/sls/report/TaxReportPage.vue"),
          meta: { title: "گزارش خرید و فروش فصلی" },
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
          meta: { title: "سازمان" },
        },
        {
          path: "edit/:id",
          component: () => import("pages/areas/org/org/EditPage.vue"),
          meta: { title: "سازمان - ویرایش" },
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
          meta: { title: "فهرست واحدهای سازمانی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/org/unit/CreatePage.vue"),
          meta: { title: "واحد سازمانی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/org/unit/EditPage.vue"),
          meta: { title: "واحد سازمانی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/org/unit/CopyPage.vue"),
          meta: { title: "واحد سازمانی - کپی" },
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
          meta: { title: "انواع واحد سازمانی" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/org/unitType/CreatePage.vue"),
          meta: { title: "نوع واحد  سازمانی - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/org/unitType/EditPage.vue"),
          meta: { title: "نوع واحد  سازمانی - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/org/unitType/CopyPage.vue"),
          meta: { title: "نوع واحد  سازمانی - کپی" },
        },
      ],
    },

    {
      path: "prl/wage",
      children: [
        {
          path: "",
          component: () =>
            import("pages/areas/prl/wage/IndexPage.vue"),
          meta: { title: "فهرست حقوق و دستمزد ماهانه" },
        },
        {
          path: "create",
          component: () =>
            import("pages/areas/prl//wage/CreatePage.vue"),
          meta: { title: "حقوق و دستمزد - ایجاد" },
        },
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/prl/wage/EditPage.vue"),
          meta: { title: "حقوق و دستمزد - ویرایش" },
        },
        {
          path: "copy/:id",
          component: () =>
            import("pages/areas/prl/wage/CopyPage.vue"),
          meta: { title: "حقوق و دستمزد - کپی" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/prl/wage/PreviewPage.vue"),
          meta: { title: "حقوق و دستمزد - پیش نمایش" },
        },
      ],
    },

    {
      path: "prl/wageItem",
      children: [
        {
          path: "edit/:id",
          component: () =>
            import("pages/areas/prl/wageItem/EditPage.vue"),
          meta: { title: "ویرایش اقلام حقوق و دستمزد" },
        },
        {
          path: "preview/:id",
          component: () =>
            import("pages/areas/prl/wageItem/PreviewPage.vue"),
          meta: { title: "فیش حقوق و دستمزد" },
        },
      ],
    },
  ],
};
