<template>
  <invoice-grid
    flat
    dense
    multi-select
    toolbar
    :table-store="tableStore"
    base-route="sls/purchase"
  >
    <template #expand="{ item }">
      <preview inside :item="item" />
    </template>
  </invoice-grid>
</template>

<script setup>
  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: Object,
    title: String,
  });
</script>
