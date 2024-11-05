<template>
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
  import { ref } from "vue";
  import Asset from "src/components/areas/acc/report/shared/balanceSheet/AssetSheet.vue";
  import Liability from "src/components/areas/acc/report/shared/balanceSheet/LiabilitySheet.vue";
  import Equity from "src/components/areas/acc/report/shared/balanceSheet/EquitySheet.vue";
</script>
