<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat
    numbered
    wrapCells
    dense
    expandable
    :no-fullscreen="noFullscreen"
  >
    <template #cell-purchaseQuantity="{ item }">
      {{ item.purchaseQuantity?.toLocaleString() }}
    </template>
    <template #cell-salesQuantity="{ item }">
      {{ item.salesQuantity?.toLocaleString() }}
    </template>
    <template #cell-inlineQuantity="{ item }">
      {{ item.inlineQuantity?.toLocaleString() }}
    </template>
    <template #cell-price="{ item }">
      {{ item.price?.toLocaleString() }}
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    dataSource: String,
    gridStore: Object,
    noFullscreen: Boolean
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
