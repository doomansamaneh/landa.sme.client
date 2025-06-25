<template>
  <toolbar-desktop margin :title="title" />

  <advanced-search />

  <tip-banner :tip="tip" closeable class="q-mb-md" />

  <chip
    icon="filter_alt"
    icon-remove="o_close"
    color="primary"
    class="q-mb-sm"
    :store="salesReviewStore"
    key-type="salesReviewType"
  />

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
        :title="$t('shared.salesReviewType.pg')"
      />

      <card-tab
        name="prd"
        icon="o_desktop_mac"
        :title="$t('shared.salesReviewType.prd')"
      />

      <card-tab
        name="crm"
        icon="o_group"
        :title="$t('shared.salesReviewType.crm')"
      />

      <card-tab
        name="prdCrm"
        icon="o_view_comfy"
        :title="$t('shared.salesReviewType.prdCrm')"
      />

      <card-tab
        name="il"
        icon="o_receipt"
        :title="$t('shared.labels.accountItem')"
      />
    </card-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="pg" class="no-padding">
        <review-pg
          :report-store="salesReviewStore"
          :data-source="`sls/report/get${actionName}ByProductGroup`"
          :title="title"
          :sub-title="$t('shared.salesReviewType.pg')"
        />
      </q-tab-panel>
      <q-tab-panel name="prd" class="no-padding">
        <review-prd
          :report-store="salesReviewStore"
          :data-source="`sls/report/get${actionName}ByProduct`"
          :title="title"
          :sub-title="$t('shared.salesReviewType.prd')"
        />
      </q-tab-panel>
      <q-tab-panel name="crm" class="no-padding">
        <review-customer
          :report-store="salesReviewStore"
          :data-source="`sls/report/get${actionName}ByCustomer`"
          :title="title"
          :sub-title="$t('shared.salesReviewType.crm')"
        />
      </q-tab-panel>
      <q-tab-panel name="prdCrm" class="no-padding">
        <review-prd-customer
          :report-store="salesReviewStore"
          :data-source="`sls/report/get${actionName}ByCustomerProduct`"
          :title="title"
          :sub-title="$t('shared.salesReviewType.prdCrm')"
        />
      </q-tab-panel>
      <q-tab-panel name="il" class="no-padding">
        <review-item
          :report-store="salesReviewStore"
          :data-source="`sls/report/get${actionName}Detail`"
          :title="title"
          :sub-title="$t('shared.labels.accountItem')"
        >
          <template #expand="{ item }">
            <slot name="item-preview" :item="item">
              <invoice-preview :id="item.invoiceId" inside />
            </slot>
          </template>
        </review-item>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useSalesReview } from "src/components/areas/acc/_composables/useSalesReview";

  import ReviewPg from "../desktop/ReviewProductGroup.vue";
  import ReviewPrd from "../desktop/ReviewProduct.vue";
  import ReviewCustomer from "../desktop/ReviewCustomer.vue";
  import ReviewPrdCustomer from "../desktop/ReviewProductCustomer.vue";
  import ReviewItem from "../desktop/ReviewItem.vue";
  import InvoicePreview from "../../invoice/shared/preview/IndexView.vue";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/toolbars/DynamicToolbarDesktop.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import Chip from "src/components/shared/CustomChip.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const props = defineProps({
    title: String,
    actionName: { type: String, default: "Invoice" },
  });

  const salesReviewStore = useSalesReview();

  const tab = ref("pg");

  const tip =
    "بر روی سطر مورد نظر دابل کلیک کنید تا گردشهای آن ردیف را در تب‌های پس از آن مشاهده کنید";
</script>
