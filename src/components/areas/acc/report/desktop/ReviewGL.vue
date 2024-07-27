<template>
  <review-data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="localGridStore"
    toolbar
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { reviewGLColumns } from "../../_composables/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useVoucherSearch();

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getGLData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const localGridStore = computed(
    () =>
      props.gridStore ||
      useBaseInfoGrid({
        filterExpression: props.filterExpression,
        sortColumn: "code",
        columns: props.columns || reviewGLColumns,
        searchModel: searchStore.searchModel,
      })
  );

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
