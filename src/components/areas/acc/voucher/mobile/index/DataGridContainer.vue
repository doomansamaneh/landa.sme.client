<template>
  <data-grid-summary :table-store="tableStore" />
  <data-grid
    :table-store="tableStore"
    :title="title"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "./DataGrid.vue";
  import DataGridSummary from "./DataGridSummary.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
  });
  const baseRoute = "acc/Voucher";
</script>
