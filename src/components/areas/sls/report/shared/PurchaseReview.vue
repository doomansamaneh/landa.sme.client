<template>
  <toolbar-desktop margin title="گزارش مرور خرید" />

  <advanced-search />

  <q-card flat class="bordered shadow q-mt-md">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        class="col-md text-h6 text-weight-700 primary-tabs"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
      >
        <custom-tab
          name="pg"
          icon="o_bubble_chart"
          title="گروه کالا و خدمات"
        />

        <custom-tab
          name="prd"
          icon="o_subject"
          title="کالا و خدمات"
        />

        <custom-tab name="crm" icon="o_menu" title="طرف حساب" />

        <custom-tab
          name="prdCrm"
          icon="o_view_comfy"
          title="طرف حساب/کالا و خدمت"
        />

        <custom-tab name="il" icon="o_receipt" title="ریز گردش" />
      </q-tabs>
    </div>

    <q-separator size="1px" />

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
  import CustomTab from "src/components/shared/CustomTab.vue";

  const tab = ref("pg");
</script>
