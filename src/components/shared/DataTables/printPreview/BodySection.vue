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
        <template
          v-for="(row, index) in tableStore?.rows.value"
          :key="row.id"
        >
          <tr class="table-row" :class="tableStore.getRowClass(row)">
            <td>
              <div
                class="text-caption no-letter-spacing text-on-dark"
              >
                {{ tableStore.rowIndex(index) }}
              </div>
            </td>

            <td
              v-for="col in tableStore?.columns.value"
              :key="col.name"
              :class="col.cellClass"
              :style="`${col.cellStyle}; font-size: ${tableStore.tdFontSize.value}px`"
            >
              <!-- :style="col.cellStyle" -->
              <slot :name="`cell-${col.name}`" :item="row">
                <div v-html="getColText(row, col)"></div>
              </slot>
            </td>
          </tr>
        </template>
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
              <slot name="td-summary" :summary="summary">
                {{ helper.formatNumber(summary) }}
              </slot>
            </td>
          </template>
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const isNumber = (value) =>
    typeof value === "number" && !isNaN(value);

  function getColText(row, col) {
    if (row && col) {
      if (col.template) {
        return col.template.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? ""
        );
      } else if (col.field) return row[col.field];
    }
    return "";
  }
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
