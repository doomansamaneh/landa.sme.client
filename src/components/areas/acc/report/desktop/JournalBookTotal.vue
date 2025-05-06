<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    expandable_
    toolbar
  ></data-grid>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { journalBookTotalColumns } from "../../_composables/constants";
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getJournalTotalData",
    },
    sortColumn: {
      type: String,
      default: "month,code,credit",
    },
  });

  const searchStore = useVoucherSearch();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: journalBookTotalColumns,
    store: useBaseInfoGrid({
      columns: journalBookTotalColumns,
      sortColumn: props.sortColumn,
      searchModel: searchStore.searchModel,
    }),
  });
</script>
