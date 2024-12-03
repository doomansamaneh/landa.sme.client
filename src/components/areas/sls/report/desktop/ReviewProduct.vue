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
  import { useInvoiceSearch } from "../../_composables/useInvoiceSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { reviewProductColumns } from "../../_composables/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useInvoiceSearch();

  const props = defineProps({
    dataSource: {
      type: String,
      default: "sls/report/getInvoiceByProduct",
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
        sortColumn: "productCode",
        columns: props.columns || reviewProductColumns,
        searchModel: searchStore.searchModel,
      })
  );

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
