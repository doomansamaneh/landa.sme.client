<template>
  <review-data-grid
    :table-store="tableStore"
    toolbar
    @row-dbl-click="filterRow"
  />
</template>

<script setup>
  import { onMounted, onUnmounted } from "vue";

  import { bus } from "src/helpers";
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";
  import { reviewSLColumns } from "../../_composables/constants";
  import { useAccountReview } from "../../_composables/useAccountReview";
  import { accountTreeType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getSLData",
    },
    filterExpression: Array,
    store: Object,
    columns: Array,
  });

  const searchStore = useVoucherSearch();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewSLColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        sortColumn: "code",
        columns: props.columns || reviewSLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.code} - ${row.title}`,
      type: accountTreeType.sl,
    });
  };

  const setSelectedAccount = () => {
    let currentFilters = props.filterExpression || [];
    const selectedCl = props.reportStore?.getItemByType(
      accountTreeType.cl
    );
    const selectedGl = props.reportStore?.getItemByType(
      accountTreeType.gl
    );
    if (selectedGl) {
      currentFilters.push({
        fieldName: "sl.glId",
        operator: sqlOperator.equal,
        value: selectedGl.id,
      });
    } else if (selectedCl) {
      currentFilters.push({
        fieldName: "gl.clId",
        operator: sqlOperator.equal,
        value: selectedCl.id,
      });
    }
    tableStore.setFilterExpression(currentFilters);
  };

  setSelectedAccount();

  const reloadData = async () => {
    setSelectedAccount();
    await tableStore.reloadData();
  };

  onMounted(() => {
    bus.on("apply-selected-account", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-selected-account", reloadData);
  });

  defineExpose({
    tableStore,
  });
</script>
