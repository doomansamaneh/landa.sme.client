<template>
  <q-card-section>
    <table class="styled-table">
      <thead>
        <tr>
          <th>ردیف</th>
          <th>کد</th>
          <th>عنوان</th>
          <th>بدهکار</th>
          <th>بستانکار</th>
          <th>مانده بدهکار</th>
          <th>مانده بستانکار</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableStore.rows.value"
          :key="index"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ row.code }}</td>
          <td>{{ row.title }}</td>
          <td>{{ helper.formatNumber(row.debit) }}</td>
          <td>{{ helper.formatNumber(row.credit) }}</td>
          <td>{{ helper.formatNumber(row.debitRemained) }}</td>
          <td>{{ helper.formatNumber(row.creditRemained) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-bold" colspan="3" style="text-align: end">
            جمع کل
          </td>
          <td>
            {{
              helper.formatNumber(
                helper.getSubtotal(tableStore.rows.value, "debit")
              )
            }}
          </td>
          <td>
            {{
              helper.formatNumber(
                helper.getSubtotal(tableStore.rows.value, "credit")
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
        </tr>
      </tfoot>
    </table>
  </q-card-section>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";
  import { reviewSLColumns } from "../../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";

  const searchStore = useVoucherSearch();

  const tableStore = useDataTable({
    dataSource: "acc/report/getSLData",
    dataColumns: reviewSLColumns,
    store: useBaseInfoGrid({
      filterExpression: [],
      sortColumn: "code",
      columns: reviewSLColumns,
      searchModel: searchStore.searchModel,
    }),
  });

  tableStore.pagination.value.pageSize = -1;

  onMounted(() => {
    tableStore.loadData();
  });
</script>

<style scoped>
  .styled-table {
    width: 100%;
    border-collapse: collapse;
  }
  .styled-table th,
  .styled-table td {
    border: 1px solid black;
    padding: 5px;
    text-align: start;
  }
  .styled-table th {
    background-color: #f2f2f2;
  }
</style>
