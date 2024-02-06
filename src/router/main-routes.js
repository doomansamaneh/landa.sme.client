import MainLayout from "src/layouts/MainLayout.vue";
import EmptyLayout from "src/layouts/EmptyLayout.vue";
import ProfilePage from "src/pages/management/ProfilePage.vue";
import HomePage from "src/pages/management/HomePage.vue";
import SettingsPage from "src/pages/management/SettingsPage.vue";
import CreateInvoice from "src/components/areas/sls/invoice/CreateInvoice.vue";
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
      component: HomePage,
    },
    {
      path: "/crm/customer",
      component: ProfilePage
    },
    {
      path: "sls/quote",
      component: () => import("src/components/areas/sls/quote/IndexView.vue"),
    },
    {
      path: "sls/invoice",
      component: () => import("pages/areas/sls/invoice/indexPage.vue"),
    },
    {
      path: "sls/invoice/preview/:id",
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
      component: () => import("src/pages/areas/cmn/productGroup/IndexPage.vue"),
    },
    {
      path: "cmn/product",
      component: () => import("src/pages/areas/cmn/product/IndexPage.vue"),
    },
  ]
}
