<template>
  <data-grid
    :table-store="tableStore"
    :title="title"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "./DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
  });
</script>
