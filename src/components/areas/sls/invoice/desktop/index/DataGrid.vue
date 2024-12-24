<template>
  <invoice-grid
    :no-fullscreen="noFullscreen"
    :table-store="tableStore"
    base-route="sls/invoice"
  >
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </invoice-grid>
</template>

<script setup>
  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: Object,
    noFullscreen: Boolean,
  });
</script>
