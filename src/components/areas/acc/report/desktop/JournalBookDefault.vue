<template>
  <data-grid :data-table-store="tableStore" flat expandable toolbar>
    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { journalBookColumns } from "../../_composables/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    dataSource: {
      type: String,
      default: "acc/report/getJournalData",
    },
    sortColumn: {
      type: String,
      default: "voucherNo,code",
    },
  });

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: journalBookColumns,
    store: useBaseInfoGrid({
      columns: journalBookColumns,
      sortColumn: props.sortColumn,
    }),
  });
</script>
