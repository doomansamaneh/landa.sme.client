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
  import { sortOrder } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { receiptColumns } from "src/components/areas/trs/_composables/constants";

  import { useDataTable } from "src/composables/useDataTable";

  import DataGridTable from "../../../payment/shared/index/DataGridTable.vue";
  import ToolbarContainer from "../../../payment/shared/index/ToolbarContainer.vue";

  const props = defineProps({
    title: String,
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
