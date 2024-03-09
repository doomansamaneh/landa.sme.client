<template>
  <data-grid
    ref="dataGrid"
    dataSource="cmn/productGroup/getGridData"
    :grid-store="gridStore"
    separator="horizontal"
    flat
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    expandable_
  >
    <template #filter-isActive="{ col }">
      <custom-select
        v-model="col.value"
        :options="isActiveOptions"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-isActive="{ item }">
      <q-btn
        v-if="item.isActive"
        round
        dense
        size="10px"
        unelevated
        icon="o_done"
        color="green-8"
        class="green-shadow no-pointer-events"
      />
      <q-btn
        v-else
        round
        dense
        size="10px"
        unelevated
        icon="o_close"
        color="negative"
        class="red-shadow no-pointer-events"
      />
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        base-route="cmn/productGroup"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue";
import { isActiveOptions } from "src/constants";

import RowToolBar from "src/components/shared/RowToolBar.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

const props = defineProps({
  gridStore: Object,
  crudStore: Object,
});

const dataGrid = ref(null);

async function reloadData() {
  await tableStore.value.reloadData();
}

const tableStore = computed(() => dataGrid?.value?.tableStore);

defineExpose({
  tableStore,
});
</script>
