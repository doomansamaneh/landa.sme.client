<template>
  <toolbar-container />

  <tip-banner
    closeable
    :title="tip.title"
    :tip="tip.message"
    class="q-mb-md"
  />

  <div
    :class="{
      'top-border q-mt-lg': $q.screen.gt.sm,
    }"
  />

  <div
    class="row q-col-gutter-md"
    :class="{
      'q-py-md': $q.screen.gt.sm,
    }"
  >
    <div
      class="col-md-6 col-sm-12 col-xs-12"
      :class="{
        'left-border q-pr-md': $q.screen.gt.sm,
      }"
    >
      <asset :model="dataStore.model.value" />
    </div>

    <div class="col-md-6 col-sm-12 col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <liability :model="dataStore.model.value" />
        </div>
        <div class="col-12">
          <equity :model="dataStore.model.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useBalanceSheet } from "../../_composables/useBalanceSheet";
  import { useI18n } from "vue-i18n";

  import Asset from "./BalanceSheet/AssetSheet.vue";
  import Liability from "./BalanceSheet/LiabilitySheet.vue";
  import Equity from "./BalanceSheet/EquitySheet.vue";
  import ToolbarContainer from "./BalanceSheet/ToolbarContainer.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const props = defineProps({
    title: String,
  });

  const dataStore = useBalanceSheet();

  const { t: $t } = useI18n();
  const tip = {
    title: $t("balanceSheet.tipTitle"),
    message: $t("balanceSheet.tipMessage"),
  };
</script>
