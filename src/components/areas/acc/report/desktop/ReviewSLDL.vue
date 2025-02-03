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
  import { reviewSLDLColumns } from "../../_composables/constants";
  import { useAccountReview } from "../../_composables/useAccountReview";
  import { accountTreeType, sqlOperator } from "src/constants";

  import ReviewDataGrid from "./_ReviewDataGrid.vue";

  const props = defineProps({
    reportStore: useAccountReview,
    dataSource: {
      type: String,
      default: "acc/report/getSLDLData",
    },
    filterExpression: Array,
    store: Object,
    columns: Array,
  });

  const searchStore = useVoucherSearch();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns || reviewSLDLColumns,
    store:
      props.gridStore ||
      useBaseInfoGrid({
        sortColumn: "slCode,dlCode",
        columns: props.columns || reviewSLDLColumns,
        searchModel: searchStore.searchModel,
      }),
  });

  const filterRow = (row) => {
    props.reportStore?.setItem({
      id: `${row.slId}|${row.dlId}`,
      title: `${row.slCode} - ${row.slTitle} / ${row.dlTitle}`,
      type: accountTreeType.slDl,
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
    const selectedDl = props.reportStore?.getItemByType(
      accountTreeType.dl
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

    if (selectedDl) {
      currentFilters.push({
        fieldName: "vi.dlId",
        operator: sqlOperator.equal,
        value: selectedDl.id,
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
