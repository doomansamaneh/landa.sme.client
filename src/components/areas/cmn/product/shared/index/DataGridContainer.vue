<template>
  <toolbar-container
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />

  <data-grid-table
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { useProductGrid } from "src/components/areas/cmn/_composables/useProductGrid";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "cmn/product/getGridData" },
  });
  const baseRoute = "cmn/product";

  const gridStore = useProductGrid();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
