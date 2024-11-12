<template>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <asset :model="dataStore.model.value" />
    </div>

    <div class="col-6 q-gutter-md">
      <liability :model="dataStore.model.value" />
      <equity :model="dataStore.model.value" />
    </div>
  </div>
</template>

<script setup>
  import { useBalanceSheet } from "../../_composables/useBalanceSheet";

  import Asset from "./balanceSheet/AssetSheet.vue";
  import Liability from "./balanceSheet/LiabilitySheet.vue";
  import Equity from "./balanceSheet/EquitySheet.vue";

  const dataStore = useBalanceSheet();
</script>
