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
  import { transferMoneyColumns } from "src/components/areas/trs/_composables/constants";

  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    title: String,
    icon: String,
    toolbar: Boolean,
    dataSource: {
      type: String,
      default: "trs/transferMoney/getGridData",
    },
  });

  const baseRoute = "trs/transferMoney";

  const gridStore = useBaseInfoGrid({
    columns: transferMoneyColumns,
    sortColumn: "date",
    sortOrder: sortOrder.descending,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
