<template>

  <advanced-search class="q-my-md" />

  <data-grid ref="dataGrid" :grid-store="gridStore" :data-source="dataSource" base-route="sls/report/productStock"
    expandable>
    <template #expand="{ item }">
      <items-grid :filter-expersions="getFilterExpersion(item)" :item="item">
        <template #expand="{ item }">
          <div class="q-pb-md">
            <preview :item="item" />
          </div>
        </template>
      </items-grid>
    </template>
  </data-grid>

  <q-card flat class="tips q-mt-md">
    <q-card-section>
      <div class="title">راهنما</div>
      <div class="q-mt-md text-body1 no-letter-spacing">
        موجودی کالاهایی که نوعشان خدمت نباشد براساس خرید و فروشهای نهایی شده. فقط خریدهایی در موجودی تاثیر میگذارند که
        نوعشان شارژ انبار و یا مشابه آن باشد
      </div>
    </q-card-section>
  </q-card>

</template>

<script setup>
import { computed, ref } from "vue";
import { sqlOperator } from "src/constants";

import DataGrid from "components/areas/_shared/report/shared/index/DataGrid.vue";
import ItemsGrid from "components/areas/sls/report/productStock/desktop/index/ItemsGrid.vue";
import Preview from "../../shared/preview/IndexView.vue";
import AdvancedSearch from "src/components/areas/sls/report/productStock/desktop/index/AdvancedSearch.vue";

const value = ref(false)

const props = defineProps({
  gridStore: Object,
  title: String,
  dataSource: String,
  crudStore: Object,
});

const dataGrid = ref(null);

const tableStore = computed(() => dataGrid.value?.tableStore);

const getFilterExpersion = (item) => {
  return [{ fieldName: "ii.productId", operator: sqlOperator.equal, value: item.id }]
}

async function reloadData() {
  await tableStore.value.reloadData();
}

defineExpose({
  tableStore,
});

</script>
