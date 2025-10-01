<template>
  <toolbar-desktop margin :title="title" />
  <advanced-search />
  <tip-banner :tip="tip" class="q-my-md" />

  <chip
    icon="filter_alt"
    icon-remove="o_close"
    color="primary"
    class="q-mb-sm"
    :store="reviewStore"
    key-type="stockReviewType"
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
        :title="$t('shared.stockReviewType.pg')"
      />

      <card-tab
        name="prd"
        icon="o_desktop_mac"
        :title="$t('shared.stockReviewType.prd')"
      />

      <card-tab
        name="il"
        icon="o_receipt"
        :title="$t('shared.stockReviewType.stockItem')"
      />
    </card-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="pg" class="no-padding">
        <review-product-group
          :report-store="reviewStore"
          :title="title"
          :sub-title="$t('shared.stockReviewType.pg')"
        />
      </q-tab-panel>
      <q-tab-panel name="prd" class="no-padding">
        <review-product
          :report-store="reviewStore"
          :title="title"
          :sub-title="$t('shared.stockReviewType.prd')"
        />
      </q-tab-panel>
      <q-tab-panel name="il" class="no-padding">
        <product-stock-item
          :report-store="reviewStore"
          :title="title"
          :sub-title="$t('shared.stockReviewType.stockItem')"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useProductStockReview } from "src/components/areas/inv/_composables/useProductStockReview";
  import { useI18n } from "vue-i18n";

  import ReviewProductGroup from "../desktop/ReviewProductGroup.vue";
  import ReviewProduct from "../desktop/ReviewProduct.vue";
  import ProductStockItem from "../desktop/ProductStockItem.vue";

  import AdvancedSearch from "../desktop/ProductStockSearch.vue";
  import ToolbarDesktop from "components/shared/toolbars/DynamicToolbarDesktop.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import CardTabs from "src/components/shared/CardTabs.vue";
  import Chip from "src/components/shared/CustomChip.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const props = defineProps({
    title: String,
  });

  const { t } = useI18n();

  const reviewStore = useProductStockReview();

  const tab = ref("pg");

  const tip = t("shared.labels.salesReviewTip");
</script>
