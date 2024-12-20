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
        title="فاکتورهای فروش"
        icon="o_bubble_chart"
      />

      <card-tab name="gl" title="فاکتورهای خرید" icon="o_subject" />

      <card-tab name="sl" title="برگشت از فروش" icon="o_menu" />

      <card-tab name="dl" title="برگشت از خرید" icon="o_view_comfy" />
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
        <tax-report data-source="sls/report/GetTaxSales" />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <tax-report data-source="sls/report/GetTaxPurchases" />
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
