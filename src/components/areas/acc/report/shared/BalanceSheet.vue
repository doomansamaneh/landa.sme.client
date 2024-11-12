<template>
  <pre>{{ dataStore.model }}</pre>

  <div class="row q-col-gutter-md">
    <div class="col-6">
      <asset />
    </div>

    <div class="col-6">
      <liability />
    </div>
    <div class="col-6"></div>
    <div class="col-6">
      <equity />
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
