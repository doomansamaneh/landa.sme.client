<template>
  <report
    :title="title"
    dataSource="acc/report/getDebtorsData"
    :grid-store="gridStore"
  />
</template>

<script setup>
  import Report from "./AccountReport.vue";

  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDebtorsState } from "src/components/areas/acc/_composables/useDebtorsState";

  const props = defineProps({
    title: String,
  });
  const accountStore = useDebtorsState();
  const gridStore = useBaseInfoGrid(accountStore);
</script>
