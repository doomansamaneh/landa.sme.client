<template>
  <data-grid
    :table-store="tableStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
  });
</script>
