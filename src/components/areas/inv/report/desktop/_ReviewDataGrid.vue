<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    numbered
    expandable
    toolbar
    :title="`${title} / ${subTitle}`"
  >
    <template #expand="{ item }">
      <product-stock-preview :item="item" :title="title" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import ProductStockPreview from "../shared/ProductStockPreview.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    title: String,
    subTitle: String,
  });
</script>
