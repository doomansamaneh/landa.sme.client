<template>
  <q-card-section class="no-padding">
    <table class="print-preview-table">
      <thead>
        <tr>
          <th>ردیف</th>

          <template
            v-for="(column, index) in tableStore.columns.value"
            :key="index"
          >
            <th v-if="column.field">
              {{ column.label }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableStore.rows.value"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <template
            v-for="(column, index) in tableStore.columns.value"
            :key="index"
          >
            <td v-if="column.field">
              {{
                isNumber(row[column.field])
                  ? helper.formatNumber(row[column.field])
                  : row[column.field]
              }}
            </td>
          </template>
        </tr>
      </tbody>
      <tfoot v-if="tableStore?.summaryData?.value">
        <tr>
          <td class="text-bold" colspan="3" style="text-align: end">
            جمع کل
          </td>
          <template
            v-for="(summary, index) in tableStore?.summaryData?.value"
            :key="index"
          >
            <td class="text-bold">
              {{ helper.formatNumber(summary) }}
            </td>
          </template>
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const isNumber = (value) =>
    typeof value === "number" && !isNaN(value);
</script>

<style lang="scss">
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
  }
</style>
