<template>
  <!-- ----------------------------------------------- -->
  <!-- Persian tools library tools:
  <br />
  <a href="https://github.com/persian-tools/persian-tools">persian tools</a>
  <input
    type="number"
    v-model="numbersInput"
  />
  <p>Result: {{ convertedNumber }}</p> -->
  <!-- ---------------------------------------------- -->

  <data-grid
    ref="dataGrid"
    dataSource="cmn/product/getGridData"
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

    <template #cell-code="{ item }">
      {{ item.code }}
      <div v-if="item.taxCode">
        <small class="caption-on-dark"> tax: {{ item.taxCode }} </small>
      </div>
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
        base-route="cmn/product"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { isActiveOptions } from "src/constants";

/////////////////////////////////////////////////////////////////
import { numberToWords } from "@persian-tools/persian-tools";
//////////////////////////////////////////////////////////////////

import RowToolBar from "src/components/shared/RowToolBar.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

/////////////////////////////////
const numbersInput = ref(1379);
const convertedNumber = ref();

watchEffect(() => {
  const converted = numberToWords(numbersInput.value);
  convertedNumber.value = converted;
});
////////////////////////////////////

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
