<template>
  <toolbar-desktop margin :title="title" />

  <advanced-search />

  <q-card flat class="bordered shadow">
    <card-tabs
      v-model="tab"
      class="text-h6 text-weight-700 primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      mobile-arrows
    >
      <card-tab
        name="cl"
        :title="$t('main-menu-items.Sls_Invoice_View')"
        icon="o_receipt"
      />

      <card-tab
        name="gl"
        :title="$t('main-menu-items.Sls_Purchase_View')"
        icon="o_shopping_cart"
      />

      <card-tab
        name="sl"
        :title="$t('main-menu-items.Sls_SalesReturn_View')"
        icon="o_undo"
      />

      <card-tab
        name="dl"
        :title="$t('main-menu-items.Sls_PurchaseReturn_View')"
        icon="o_undo"
      />
    </card-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="cl" class="no-padding">
        <tax-report data-source="sls/report/GetTaxSales" />
      </q-tab-panel>
      <q-tab-panel name="gl" class="no-padding">
        <tax-report data-source="sls/report/GetTaxPurchases" />
      </q-tab-panel>
      <q-tab-panel name="sl" class="no-padding">
        <tax-report data-source="sls/report/GetTaxSalesReturn" />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <tax-report data-source="sls/report/GetTaxPurchaseReturn" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import TaxReport from "../desktop/TaxReport.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";

  const props = defineProps({
    title: String,
  });

  const tab = ref("cl");
</script>
