<template>
  <q-card-section>
    <table class="print-preview-table">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>ش سند</th>
          <th>تاریخ</th>
          <th>شرح</th>
          <th>بدهکار</th>
          <th>بستانکار</th>
          <th>مانده بدهکار</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableStore.rows.value"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ row.voucherNo }}</td>
          <td>{{ row.voucherDateString }}</td>
          <td>
            {{ row.slCode }} - {{ row.slTitle }} / {{ row.dlCode }} -
            {{ row.dlTitle }}
            <span class="text-caption text-on-dark">
              {{ row.comment }}
            </span>
          </td>
          <td>{{ helper.formatNumber(row.inlineDebit) }}</td>
          <td>{{ helper.formatNumber(row.creditRemained) }}</td>
          <td>{{ helper.formatNumber(row.debitRemained) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="text-align: end" colspan="4" class="text-bold">
            جمع کل
          </td>
          <td>
            {{
              helper.formatNumber(
                helper.getSubtotal(
                  tableStore.rows.value,
                  "creditRemained"
                )
              )
            }}
          </td>
          <td>
            {{
              helper.formatNumber(
                helper.getSubtotal(
                  tableStore.rows.value,
                  "debitRemained"
                )
              )
            }}
          </td>
          <!-- <td>
            {{
              helper.formatNumber(
                helper.getSubtotal(
                  tableStore.rows.value,
                  "inlineDebit"
                )
              )
            }}
          </td> -->
          <td>0</td>
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";
  import { accountItemColumns } from "../../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";

  const searchStore = useVoucherSearch();

  const tableStore = useDataTable({
    dataSource: "acc/report/getItemData",
    dataColumns: accountItemColumns,
    store: useBaseInfoGrid({
      filterExpression: [],
      sortColumn: "voucherNo",
      columns: accountItemColumns,
      searchModel: searchStore.searchModel,
    }),
  });

  tableStore.pagination.value.pageSize = -1;

  onMounted(() => {
    tableStore.loadData();
  });
</script>

<style scoped>
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
