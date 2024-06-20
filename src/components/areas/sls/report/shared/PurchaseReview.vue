<template>
  <toolbar-desktop margin title="گزارش مرور خرید" />

  <advanced-search />

  <div class="q-mt-md">
    <q-tabs
      v-model="tab"
      class="text-h6 text-weight-700 primary-tabs q-mt-lg"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab
        name="pg"
        class="q-mr-xs text-h6 text-weight-700"
        label="گروه کالا و خدمت"
        icon="bubble_chart"
      />
      <q-tab
        name="prd"
        class="q-mr-xs text-h6 text-weight-700"
        label="کالا و خدمت"
        icon="subject"
      />
      <q-tab
        name="crm"
        class="q-mr-xs text-h6 text-weight-700"
        label="طرف حساب"
        icon="menu"
      />
      <q-tab
        name="prdCrm"
        class="q-mr-xs text-h6 text-weight-700"
        label="طرف حساب/کالا و خدمت"
        icon="view_comfy"
      />
      <q-tab
        name="il"
        class="q-mr-xs text-h6 text-weight-700"
        label="ریزگردش"
        icon="receipt"
      />
    </q-tabs>

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
  </div>
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

  const tab = ref("pg");
</script>
