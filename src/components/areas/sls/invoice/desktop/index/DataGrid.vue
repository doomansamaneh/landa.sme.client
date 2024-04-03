<template>
  <div>
    <advanced-search :grid-store="gridStore" @apply-search="reloadData" />
  </div>

  <div class="q-py-md">
    <q-tabs v-model="tab" class="border-radius-lg bg-primary text-white q-mb-md" align="left" inline-label
      narrow-indicator @update:model-value="tabChanged">
      <q-tab name="invoice" class="text-h6 text-weight-700" label="فاکتورهای فروش" icon="check" />
      <q-tab name="canceled" class="text-h6 text-weight-700" label="ابطال شده" icon="o_cancel" />
    </q-tabs>

    <invoice-grid ref="invoiceTable" :grid-store="gridStore" :data-source="dataSource" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { sqlOperator, cancelStatus } from "src/constants";

import InvoiceGrid from "components/areas/sls/invoice/desktop/index/_DataGrid.vue";
import AdvancedSearch from "components/areas/sls/invoice/desktop/index/_AdvancedSearch.vue";

const props = defineProps({
  gridStore: Object,
  title: String,
  dataSource: String,
  crudStore: Object,
});

const invoiceTable = ref(null);

const tab = ref("invoice");

const tableStore = computed(() => invoiceTable.value?.dataTable?.tableStore);

function setDefaultFilter() {
  tableStore.value.setFilterExpression([
    {
      fieldName: "d.StatusId",
      operator: sqlOperator.notEqual,
      value: cancelStatus,
    },
  ]);
}

function setCancelFilter() {
  tableStore.value.setFilterExpression([
    {
      fieldName: "d.StatusId",
      operator: sqlOperator.equal,
      value: cancelStatus,
    },
  ]);
}

async function tabChanged(e) {
  if (e === "canceled") setCancelFilter();
  else setDefaultFilter();
  await reloadData();
}

async function reloadData() {
  await tableStore.value.reloadData();
}

defineExpose({
  tableStore,
});
</script>
