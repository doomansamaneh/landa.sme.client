<template>
  <toolbar-desktop margin :title="title" />

  <advanced-search />

  <q-card flat class="bordered shadow q-mt-md">
    <card-tabs
      v-model="tab"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <card-tab
        name="pg"
        icon="o_view_module"
        title="گروه کالا و خدمات"
      />

      <card-tab
        name="prd"
        icon="o_desktop_mac"
        title="کالا و خدمات"
      />

      <card-tab name="crm" icon="o_group" title="طرف حساب" />

      <card-tab
        name="prdCrm"
        icon="o_view_comfy"
        title="طرف حساب/کالا و خدمت"
      />

      <card-tab name="il" icon="o_receipt" title="ریز گردش" />
    </card-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="pg" class="no-padding">
        <review-pg
          data-source="sls/report/getPurchaseByProductGroup"
        />
      </q-tab-panel>
      <q-tab-panel name="prd" class="no-padding">
        <review-prd data-source="sls/report/getPurchaseByProduct" />
      </q-tab-panel>
      <q-tab-panel name="crm" class="no-padding">
        <review-customer
          data-source="sls/report/getPurchaseByCustomer"
        />
      </q-tab-panel>
      <q-tab-panel name="prdCrm" class="no-padding">
        <review-prd-customer
          data-source="sls/report/getPurchaseByCustomerProduct"
        />
      </q-tab-panel>
      <q-tab-panel name="il" class="no-padding">
        <review-item data-source="sls/report/getPurchaseDetail" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import ReviewPg from "../desktop/ReviewProductGroup.vue";
  import ReviewPrd from "../desktop/ReviewProduct.vue";
  import ReviewCustomer from "../desktop/ReviewCustomer.vue";
  import ReviewPrdCustomer from "../desktop/ReviewProductCustomer.vue";
  import ReviewItem from "../desktop/ReviewItem.vue";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const props = defineProps({
    title: String,
  });
  const tab = ref("pg");
</script>
