import MainLayout from "src/layouts/MainLayout.vue";
import ProfilePage from "src/pages/management/ProfilePage.vue";
import HomePage from "src/pages/management/HomePage.vue";
import IndexView from "src/components/areas/sls/quote/IndexView.vue";
import InvoiceIndexView from "src/components/areas/sls/invoice/IndexView.vue";
import CreateInvoice from "src/components/areas/sls/invoice/CreateInvoice.vue";
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
      path: "/crm/customer",
      component: ProfilePage
    },
    {
      path: ":businessId",
      component: HomePage
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
      path: "sls/invoice/create",
      component: CreateInvoice,
    },
    {
      path: "sls/invoice2/create",
      component: CreateInvoiceV2,
    }
  ]
}
