<template>
  <toolbar :title="`مانده ${title}`" back-button />

  <data-grid-table
    :title="title"
    :table-store="tableStore"
    :advanced-search="false"
  />
</template>

<script setup>
  import { useInvoiceFilteredGrid } from "components/areas/sls/_composables/useInvoiceFilteredGrid";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGridTable from "./DataGridTable.vue";
  import Toolbar from "components/shared/toolbars/DynamicToolbarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    dataSource: { type: String, default: "sls/invoice/getGridData" },
  });

  const invoiceStore = useInvoiceFilteredGrid();
  //const gridStore = useBaseInfoGrid(invoiceStore);
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: invoiceStore,
  });
</script>
