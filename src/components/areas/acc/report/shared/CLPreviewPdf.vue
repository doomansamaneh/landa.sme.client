<template>
  <q-card>
    <div :ref="printStore.printRef">
      <q-card-section class="text-center">
        <div class="text-h6 no-letter-spacing">
          حسابداری آنلاین لاندا
        </div>
        <div class="text-body1 no-letter-spacing">
          تراز آزمایشی - گروه حساب (1401)
        </div>
      </q-card-section>

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
              <td
                class="text-bold"
                colspan="3"
                style="text-align: end"
              >
                جمع کل
              </td>
              <td>{{ helper.formatNumber(total.debit) }}</td>
              <td>{{ helper.formatNumber(total.credit) }}</td>
              <td>{{ helper.formatNumber(total.debitRemained) }}</td>
              <td>
                {{ helper.formatNumber(total.creditRemained) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { usePrint } from "src/composables/usePrint";
  import { helper } from "src/helpers";
  import { useVoucherSearch } from "../../_composables/useVoucherSearch";
  import { reviewCLColumns } from "../../_composables/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useDataTable } from "src/composables/useDataTable";

  const printStore = usePrint();

  const total = computed(() =>
    tableStore.rows.value.reduce(
      (totals, row) => {
        totals.debit += row.debit || 0;
        totals.credit += row.credit || 0;
        totals.debitRemained += row.debitRemained || 0;
        totals.creditRemained += row.creditRemained || 0;
        return totals;
      },
      {
        debit: 0,
        credit: 0,
        debitRemained: 0,
        creditRemained: 0,
      }
    )
  );

  const searchStore = useVoucherSearch();

  const tableStore = useDataTable({
    dataSource: "acc/report/getCLData",
    dataColumns: reviewCLColumns,
    store: useBaseInfoGrid({
      filterExpression: [],
      sortColumn: "code",
      columns: reviewCLColumns,
      searchModel: searchStore.searchModel,
    }),
  });

  console.log(tableStore.rows);

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
