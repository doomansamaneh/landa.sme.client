<template>
  <div v-if="!dataStore.showLoader.value" class="column q-gutter-md">
    <div>
      <asset-table
        :model="dataStore.model.value"
        assetType="currentAsset"
        title="دارایی"
      />
    </div>

    <div>
      <liability-table
        :model="dataStore.model.value"
        assetType="liability"
        title="بدهی"
      />
    </div>

    <div>
      <equity-table
        :model="dataStore.model.value"
        assetType="equity"
        title="سرمایه"
      />
    </div>
  </div>
</template>

<script setup>
  import { useBalanceSheet } from "src/components/areas/acc/_composables/useBalanceSheet";

  import AssetTable from "./AssetTable.vue";
  import LiabilityTable from "./LiabilityTable.vue";
  import EquityTable from "./EquityTable.vue";

  const dataStore = useBalanceSheet();
</script>

<style lang="scss" scoped>
  @media print {
    .print-preview-table {
      width: 100%;
      border-collapse: collapse;
    }
    .print-preview-table th,
    .print-preview-table td {
      border: 1px solid black;
      padding: 5px;
      text-align: start;
    }
    .print-preview-table th {
      background-color: #f2f2f2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
