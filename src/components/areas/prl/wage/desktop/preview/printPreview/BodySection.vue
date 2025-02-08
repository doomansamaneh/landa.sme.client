<template>
  <table
    class="print-preview-table"
    v-if="!tableStore.showLoader.value"
  >
    <thead>
      <tr>
        <th style="width: 1px">#</th>
        <th
          v-for="column in tableStore.columns.value"
          :key="column.field"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in tableStore.rows.value"
        :key="rowIndex"
      >
        <td style="width: 1px">{{ rowIndex + 1 }}</td>

        <td
          v-for="column in tableStore.columns.value"
          :key="column.field"
        >
          {{ formatValue(row[column.field], column.type) }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="100%">جمع کل</td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
  import { sqlOperator } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { wageItemColumns } from "../../../../_composables/constants";
  import { onMounted } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { helper } from "src/helpers";
  import { dataType } from "src/constants";

  const props = defineProps({
    wageId: String,
  });

  const gridStore = useBaseInfoGrid({
    columns: wageItemColumns,
    sortColumn: "rowNo",
    filterExpression: [
      {
        fieldName: "i.wageId",
        operator: sqlOperator.equal,
        value: props.wageId,
      },
    ],
  });

  const tableStore = useDataTable({
    dataSource: "prl/wageItem/getGridData",
    store: gridStore,
  });

  const formatValue = (value, type) => {
    if (type === dataType.date) return value.substring(0, 10);
    if (type === dataType.number) return helper.formatNumber(value);

    return value;
  };

  onMounted(() => {
    tableStore.loadData();
  });
</script>

<style lang="scss">
  @media print {
    .print-preview-table {
      width: 100%;
      border-collapse: collapse;
    }
    .print-preview-table th,
    .print-preview-table td {
      border: 1px solid black;
      padding: 5px;
      text-align: start;
    }
    .print-preview-table th {
      background-color: #f2f2f2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
