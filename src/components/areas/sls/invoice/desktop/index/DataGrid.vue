<template>
  <invoice-grid
    :no-fullscreen="noFullscreen"
    :table-store="tableStore"
    :title="title"
    :sub-title="subTitle"
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
    title: String,
    subTitle: String,
  });
</script>
