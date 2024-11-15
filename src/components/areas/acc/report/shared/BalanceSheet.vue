<template>
  <toolbar-desktop margin :title="title" />
  <div class="row q-col-gutter-md q-mt-xs_">
    <div class="col-md-6 col-sm-12 col-xs-12">
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

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import Asset from "./balanceSheet/AssetSheet.vue";
  import Liability from "./balanceSheet/LiabilitySheet.vue";
  import Equity from "./balanceSheet/EquitySheet.vue";

  const props = defineProps({
    title: String,
  });
  const dataStore = useBalanceSheet();
</script>
