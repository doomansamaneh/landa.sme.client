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

  <data-grid
    ref="dataGrid"
    :grid-store="gridStore"
    :data-source="dataSource"
    base-route="sls/report/productStock"
    expandable
  >
    <template #expand="{ item }">
      <preview :item="item" />
    </template>
  </data-grid>
</template>

<script setup>
import { computed, ref } from "vue";

import DataGrid from "components/areas/_shared/report/shared/index/DataGrid.vue";
import Preview from "../../shared/preview/IndexView.vue";

const props = defineProps({
  gridStore: Object,
  title: String,
  dataSource: String,
  crudStore: Object,
});

const dataGrid = ref(null);

const tableStore = computed(() => dataGrid.value?.tableStore);

async function reloadData() {
  await tableStore.value.reloadData();
}

defineExpose({
  tableStore,
});

</script>
