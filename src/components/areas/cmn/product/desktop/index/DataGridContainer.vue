<template>
  <voucher-data-grid
    :table-store="tableStore"
    :base-route="baseRoute"
    :title="title"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import VoucherDataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
  });
</script>
