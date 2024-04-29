<template>
  <q-card flat class="tips q-mb-md">
    <q-card-section>
      <div class="title">راهنما</div>
      <div class="q-mt-md text-body1 no-letter-spacing">
        موجودی کالاهایی که نوعشان خدمت نباشد براساس خرید و فروشهای نهایی شده. فقط خریدهایی در موجودی تاثیر میگذارند که
        نوعشان شارژ انبار و یا مشابه آن باشد
      </div>
    </q-card-section>
  </q-card>

  <invoice-grid
    ref="invoiceTable"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/report/productStock"
  >
    <template #expand="{ item }">
      <preview :item="item" />
    </template>
  </invoice-grid>
</template>

<script setup>
import { computed, ref } from "vue";

import InvoiceGrid from "components/areas/sls/_shared/invoice/desktop/index/DataGrid.vue";
import Preview from "../../shared/preview/IndexView.vue";

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
