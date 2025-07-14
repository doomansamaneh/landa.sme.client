<template>
  <invoice-grid
    :no-fullscreen="noFullscreen"
    :table-store="tableStore"
    :title="title"
    base-route="sls/invoice"
  >
    <template #toolbar>
      <DataGridToolbar
        :table-store="tableStore"
        :title="title"
        :printPreviewComponent="InvoicePrintPreview"
      />
    </template>
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </invoice-grid>
</template>

<script setup>
  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import DataGridToolbar from "src/components/shared/dataTables/desktop/DataGridToolbar.vue";
  import InvoicePrintPreview from "src/components/areas/sls/invoice/shared/printPreview/DataGridPreview.vue";

  const props = defineProps({
    tableStore: Object,
    noFullscreen: Boolean,
    title: String,
  });
</script>
