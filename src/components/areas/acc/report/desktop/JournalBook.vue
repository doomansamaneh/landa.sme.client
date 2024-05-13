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
    <template #cell-debit="{ item }">
      {{ item.debit?.toLocaleString() }}
    </template>

    <template #cell-credit="{ item }">
      {{ item.credit?.toLocaleString() }}
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed, ref, onMounted, onUnmounted } from "vue";
  import { bus } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
    dataSource: String,
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
