<template>
  <div class="column q-gutter-md">
    <div>
      <asset-table
        :model="dataStore.model.value"
        assetType="currentAsset"
        title="دارایی"
        sectionTitle="دارایی های جاری"
      />
    </div>

    <div>
      <liability-table
        :model="dataStore.model.value"
        assetType="liability"
        title="بدهی"
        sectionTitle="بدهی جاری"
      />
    </div>

    <div>
      <equity-table
        :model="dataStore.model.value"
        assetType="equity"
        title="سرمایه"
        sectionTitle="حقوق صاحبان سهام"
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
