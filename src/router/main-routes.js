import MainLayout from "src/layouts/MainLayout.vue";
import ProfilePage from "src/pages/management/ProfilePage.vue";
import HomePage from "src/pages/management/HomePage.vue";
import SettingsPage from "src/pages/management/SettingsPage.vue";
import IndexView from "src/components/areas/sls/quote/IndexView.vue";
import InvoiceIndexView from "src/components/areas/sls/invoice/IndexView.vue";
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
      path: "cmn/productGroup/create",
      component: () => import("src/pages/areas/cmn/productGroup/CreatePage.vue"),
    },
    {
      path: "cmn/productGroup/edit/:id",
      component: () => import("src/pages/areas/cmn/productGroup/EditPage.vue"),
    },
    {
      path: "cmn/productGroup/copy/:id",
      component: () => import("src/pages/areas/cmn/productGroup/CopyPage.vue"),
    },
    {
      path: "cmn/product",
      component: () => import("src/pages/areas/cmn/product/IndexPage.vue"),
    },
    {
      path: "cmn/product/create",
      component: () => import("src/pages/areas/cmn/product/CreatePage.vue"),
    },
    {
      path: "cmn/product/edit/:id",
      component: () => import("src/pages/areas/cmn/product/EditPage.vue"),
    },
    {
      path: "cmn/product/copy/:id",
      component: () => import("src/pages/areas/cmn/product/CopyPage.vue"),
    },
  ]
}
