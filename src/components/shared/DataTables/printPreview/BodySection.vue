<template>
  <q-card-section class="q-py-none q-px-xs">
    <table class="print-preview-table">
      <thead>
        <tr>
          <th style="width: 1px">ردیف</th>
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
        <template v-for="(row, index) in data.items" :key="row.id">
          <tr class="table-row">
            <td>
              <div class="text-caption">
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
      <tfoot v-if="data.summaryData">
        <tr>
          <td
            class="text-bold"
            :colspan="getColspan()"
            style="text-align: end"
          >
            {{ $t("shared.labels.total") }}
          </td>
          <template
            v-for="fieldName in Object.keys(data.summaryData)"
            :key="fieldName"
          >
            <td v-if="showSummaryColumn(fieldName)" class="text-bold">
              {{ helper.formatNumber(data.summaryData[fieldName]) }}
            </td>
          </template>
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { dataType } from "src/constants";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const data = ref({});

  function getColText(row, col) {
    if (row && col) {
      if (col.template) {
        return col.template.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? ""
        );
      } else if (col.field) {
        const value = row[col.field];
        if (col.type === dataType.date)
          return value?.substring(0, 10);
        else if (col.type === dataType.number)
          return helper.formatNumber(value);
        return value;
      }
    }
    return "";
  }

  const showSummaryColumn = (fieldName) => {
    return (
      helper.findIndex(
        props.tableStore.columns.value,
        "field",
        fieldName
      ) >= 0
    );
  };

  const getColspan = () => {
    if (!data.value.summaryData) return 1;
    const firstFieldName = Object.keys(data.value.summaryData)[0];

    return (
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        firstFieldName
      ) + 1
    ); //row no column
  };

  onMounted(async () => {
    data.value = await props.tableStore.getAll();
  });
</script>

<style lang="scss" scoped>
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
