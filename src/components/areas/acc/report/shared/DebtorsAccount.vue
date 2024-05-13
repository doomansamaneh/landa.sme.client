<template>
  <report
    :title="$t('main-menu-items.Acc_Report_Debtors')"
    dataSource="acc/report/getDebtorsData"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import Report from "./AccountReport.vue";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDebtorsState } from "src/components/areas/acc/_composables/useDebtorsState";

  const accountStore = useDebtorsState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
