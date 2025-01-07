<template>
  <data-grid :data-table-store="tableStore" flat expandable_ toolbar>
    <template #cell-debit="{ item }">
      <span class="text-weight-600">
        {{ helper.formatNumber(item.debit) }}
      </span>
    </template>

    <template #cell-credit="{ item }">
      <span class="text-weight-600">
        {{ helper.formatNumber(item.credit) }}
      </span>
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { journalBookTotalColumns } from "../../_composables/constants";

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

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: journalBookTotalColumns,
    store: useBaseInfoGrid({
      columns: journalBookTotalColumns,
      sortColumn: props.sortColumn,
    }),
  });
</script>
