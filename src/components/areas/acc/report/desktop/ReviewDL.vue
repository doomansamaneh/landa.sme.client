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
  import { reviewDLColumns } from "../../_composables/constants";
  import { useAccountReview } from "../../_composables/useAccountReview";
  import { accountTreeType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const searchStore = useVoucherSearch();

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getDLData",
    },
    filterExpression: Array,
    gridStore: Object,
    columns: Array,
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewDLColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        sortColumn: "code",
        columns: props.columns || reviewDLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: row.id,
      title: `${row.code} - ${row.title}`,
      type: accountTreeType.dl,
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
    const selectedSl = props.reportStore?.getItemByType(
      accountTreeType.sl
    );

    if (selectedSl) {
      currentFilters.push({
        fieldName: "vi.slId",
        operator: sqlOperator.equal,
        value: selectedSl.id,
      });
    } else if (selectedGl) {
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
