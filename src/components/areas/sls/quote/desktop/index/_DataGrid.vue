<template>
  <invoice-grid
    ref="invoiceTable"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/quote"
  >
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </invoice-grid>
</template>

<script setup>
  import { computed, ref } from "vue";

  import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    gridStore: Object,
    dataSource: String,
  });

  const invoiceTable = ref(null);

  const tableStore = computed(
    () => invoiceTable.value?.dataTable?.tableStore
  );

  defineExpose({
    tableStore,
  });
</script>
