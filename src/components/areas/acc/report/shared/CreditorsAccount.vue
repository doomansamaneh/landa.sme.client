<template>
  <report
    :title="$t('main-menu-items.Acc_Report_Creditors')"
    data-source="acc/report/getCreditorsData"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import Report from "./AccountReport.vue";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useCreditorsState } from "src/components/areas/acc/_composables/useCreditorsState";

  const accountStore = useCreditorsState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
