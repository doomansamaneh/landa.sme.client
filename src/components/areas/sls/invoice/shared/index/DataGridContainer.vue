<template>
  <toolbar-container
    v-if="toolbar"
    :table-store="tableStore"
    :title="$q.screen.xs ? title : null"
  />

  <data-grid-table :title="title" :table-store="tableStore" />
</template>

<script setup>
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useInvoiceState } from "../../../_composables/useInvoiceState";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import DataGridTable from "./DataGridTable.vue";

  const props = defineProps({
    toolbar: Boolean,
    dataSource: { type: String, default: "sls/invoice/getGridData" },
    title: String,
  });

  const invoiceStore = useInvoiceState();
  const gridStore = useBaseInfoGrid(invoiceStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: gridStore,
  });
</script>
