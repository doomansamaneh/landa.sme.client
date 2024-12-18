<template>
  <data-grid :data-table-store="tableStore" flat expandable toolbar>
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
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { journalBookTotalColumns } from "../../_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getJournalTotalData",
    },
    sortColumn: {
      type: String,
      default: "voucherNo,code",
    },
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: journalBookTotalColumns,
    store: useBaseInfoGrid({
      columns: journalBookTotalColumns,
      sortColumn: props.sortColumn,
    }),
  });
</script>
