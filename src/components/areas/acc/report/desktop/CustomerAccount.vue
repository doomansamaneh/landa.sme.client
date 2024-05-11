<template>
  <data-grid
    ref="dataGrid"
    :grid-store="gridStore"
    separator="horizontal"
    flat
    :data-source="dataSource"
    expandable
    wrapCells
  >
    <template #cell-credit="{ item }">
      {{ item.credit?.toLocaleString() }}
    </template>

    <template #cell-debit="{ item }">
      {{ item.debit?.toLocaleString() }}
    </template>

    <template #cell-debitRemained="{ item }">
      {{ item.debitRemained?.toLocaleString() }}
    </template>

    <template #cell-creditRemained="{ item }">
      {{ item.creditRemained?.toLocaleString() }}
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed, ref, onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";

  import DataGrid from "components/areas/_shared/report/shared/index/DataGrid.vue";
  import Preview from "./CustomerAccountPreview.vue";

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
