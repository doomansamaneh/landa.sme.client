<template>
  <toolbar-desktop
    v-if="$q.screen.gt.sm"
    :title="`مانده ${title}`"
    back-button
  />
  <toolbar-mobile
    v-else
    :title="`مانده ${title}`"
    back-button
    no-items
  />

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
  import ToolbarDesktop from "components/shared/toolbars/DynamicToolbarDesktop.vue";
  import ToolbarMobile from "components/shared/toolbars/MobilePreviewToolbar.vue";
  import { useQuasar } from "quasar";

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

  const $q = useQuasar();
</script>
