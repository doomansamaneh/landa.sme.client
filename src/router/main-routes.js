import MainLayout from "src/layouts/MainLayout.vue";
import ProfilePage from "src/pages/management/ProfilePage.vue";
import HomePage from "src/pages/management/HomePage.vue";
import SettingsPage from "src/pages/management/SettingsPage.vue";
import IndexView from "src/components/areas/sls/quote/IndexView.vue";
import InvoiceIndexView from "src/components/areas/sls/invoice/IndexView.vue";
import CreateInvoice from "src/components/areas/sls/invoice/CreateInvoice.vue";
import ContactLookup from "src/components/areas/sls/invoice/create/mobile/ContactLookup.vue";
import SelectProduct from "src/components/areas/sls/invoice/create/mobile/SelectProduct.vue";
import ProductLookup from "src/components/areas/sls/invoice/create/mobile/ProductLookup.vue";
import InvoicePreview from "src/components/areas/sls/invoice/InvoicePreview.vue";
import CreateInvoiceV2 from "src/components/areas/sls/invoice/CreateInvoiceV2.vue";

export default {
  path: "/",
  component: MainLayout,
  name: "dashboard",
  meta: {
    icon: "o_dashboard"
  },
  children: [
    {
      path: ":businessId",
      component: HomePage
    },
    {
      path: "/dashboard",
      component: HomePage
    },
    {
      path: "/crm/customer",
      component: ProfilePage
    },
    {
      path: "sls/quote",
      component: IndexView
    },
    {
      path: "sls/invoice",
      component: InvoiceIndexView,
    },
    {
      path: "sls/invoice/preview",
      component: InvoicePreview,
    },
    {
      path: "sls/invoice/create",
      component: CreateInvoice,
    },
    {
      path: "sls/invoice/create/selectproduct",
      component: SelectProduct,
    },
    {
      path: "sls/invoice/create/contactlookup",
      component: ContactLookup,
    },
    {
      path: "sls/invoice/create/selectproduct/productlookup",
      component: ProductLookup,
    },
    {
      path: "sls/invoice2/create",
      component: CreateInvoiceV2,
    },
    {
      path: "/settings",
      component: SettingsPage,
    },
    {
      path: "cmn/productGroup",
      component: () => import("src/components/areas/cmn/productGroup/IndexView.vue"),
    },
    {
      path: "cmn/productGroup/create",
      component: () => import("src/components/areas/cmn/productGroup/Create2View.vue"),
    },
    {
      path: "cmn/productGroup/edit/:id",
      component: () => import("src/components/areas/cmn/productGroup/Edit2View.vue"),
    },

    {
      path: "cmn/product",
      component: () => import("src/components/areas/cmn/product/IndexView.vue"),
    },
    {
      path: "cmn/product/create",
      component: () => import("src/components/areas/cmn/product/Create2View.vue"),
    },
    {
      path: "cmn/product/edit/:id",
      component: () => import("src/components/areas/cmn/product/Edit2View.vue"),
    },
  ]
}
