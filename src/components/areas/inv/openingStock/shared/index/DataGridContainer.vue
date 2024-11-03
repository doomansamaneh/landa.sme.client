<template>
  <toolbar-container
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
  />

  <data-grid-table
    :title="title"
    :icon="icon"
    :table-store="tableStore"
  />
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { openingStockColumns } from "../../../_composables/constants";

  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    icon: String,
    toolbar: Boolean,
    dataSource: {
      type: String,
      default: "inv/openingStock/getGridData",
    },
  });

  const gridStore = useBaseInfoGrid({
    columns: openingStockColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
