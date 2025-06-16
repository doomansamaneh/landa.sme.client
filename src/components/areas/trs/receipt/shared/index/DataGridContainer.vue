<template>
  <toolbar-container
    v-if="toolbar"
    :title="title"
    :table-store="tableStore"
    :base-route="baseRoute"
  />

  <data-grid-table
    :title="title"
    :icon="icon"
    :table-store="tableStore"
    :base-route="baseRoute"
  />
</template>

<script setup>
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { receiptColumns } from "src/components/areas/trs/_composables/constants";

  import { useDataTable } from "src/composables/useDataTable";

  import DataGridTable from "./DataGridTable.vue";
  import ToolbarContainer from "./ToolbarContainer.vue";

  const props = defineProps({
    title: String,
    icon: String,
    toolbar: Boolean,
    dataSource: { type: String, default: "trs/receipt/getGridData" },
  });

  const baseRoute = "trs/receipt";

  const gridStore = useBaseInfoGrid({
    columns: receiptColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
