<template>
  <advanced-search :grid-store="gridStore" @apply-search="reloadData" />

  <invoice-grid
    class="q-mt-lg"
    ref="invoiceTable"
    :grid-store="gridStore"
    :data-source="dataSource"
  />
</template>

<script setup>
import { computed, ref } from "vue";

import InvoiceGrid from "./_DataGrid.vue";
import AdvancedSearch from "./_AdvancedSearch.vue";

const props = defineProps({
  gridStore: Object,
  title: String,
  dataSource: String,
  crudStore: Object,
});

const invoiceTable = ref(null);

const tableStore = computed(() => invoiceTable.value?.dataTable?.tableStore);

async function reloadData() {
  await tableStore.value.reloadData();
}

defineExpose({
  tableStore,
});
</script>
