<template>
  <q-card-section class="no-padding">
    <table class="print-preview-table">
      <thead>
        <tr>
          <th style="width: 1%">ردیف</th>
          <template
            v-for="col in tableStore.columns.value"
            :key="col.name"
          >
            <th v-if="col.field">
              {{ col.label }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, index) in rows" :key="row.id">
          <tr class="table-row" :class="tableStore.getRowClass(row)">
            <td>
              <div
                class="text-caption no-letter-spacing text-on-dark"
              >
                {{ index + 1 }}
              </div>
            </td>

            <template
              v-for="col in tableStore?.columns.value"
              :key="col.name"
            >
              <td
                v-if="col.field"
                :class="col.cellClass"
                :style="`${col.cellStyle}; font-size: ${tableStore.tdFontSize.value}px`"
              >
                <!-- :style="col.cellStyle" -->
                <slot :name="`cell-${col.name}`" :item="row">
                  <div v-html="getColText(row, col)"></div>
                </slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
      <tfoot v-if="tableStore?.summaryData?.value">
        <tr>
          <td
            class="text-bold"
            :colspan="getColspan()"
            style="text-align: end"
          >
            {{ $t("shared.labels.total") }}
          </td>
          <td
            v-for="summary in tableStore?.summaryData?.value"
            :key="index"
            class="text-bold"
          >
            {{ helper.formatNumber(summary) }}
          </td>
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const rows = ref([]);
  const isNumber = (value) =>
    typeof value === "number" && !isNaN(value);

  function getColText(row, col) {
    if (row && col) {
      if (col.template) {
        return col.template.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? ""
        );
      } else if (col.field) {
        const value = row[col.field];
        return isNumber(value) ? helper.formatNumber(value) : value;
      }
    }
    return "";
  }

  const getColspan = () => {
    if (!props.tableStore?.summaryData?.value) return 1;
    const firstFieldName = Object.keys(
      props.tableStore.summaryData.value
    )[0];
    return (
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        firstFieldName
      ) + 1
    ); //row no column
  };

  onMounted(async () => {
    rows.value = await props.tableStore.getAll();
  });
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
