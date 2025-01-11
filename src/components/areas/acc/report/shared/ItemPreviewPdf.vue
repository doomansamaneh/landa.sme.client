<template>
  <q-card>
    <q-card-section class="text-center">
      <div class="text-h6 no-letter-spacing">
        حسابداری آنلاین لاندا
      </div>
      <div class="text-body1 no-letter-spacing">
        تراز آزمایشی - ریز گردش (1401)
      </div>
    </q-card-section>

    <q-card-section>
      <table class="styled-table">
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
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ row.documentNumber }}</td>
            <td>{{ row.date }}</td>
            <td>{{ row.description }}</td>
            <td>{{ helper.formatNumber(row.debtor) }}</td>
            <td>{{ helper.formatNumber(row.creditor) }}</td>
            <td>{{ helper.formatNumber(row.debtorBalance) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td style="text-align: end" colspan="4" class="text-bold">
              جمع کل
            </td>
            <td class="text-bold">
              {{ helper.formatNumber(total.debtor) }}
            </td>
            <td class="text-bold">
              {{ helper.formatNumber(total.creditor) }}
            </td>
            <td class="text-bold">
              {{ helper.formatNumber(total.debtorBalance) }}
            </td>
          </tr>
        </tfoot>
      </table>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { reactive, computed } from "vue";
  import { helper } from "src/helpers";

  const tableData = reactive([
    {
      documentNumber: 1001,
      date: "1401/01/01",
      description: "بابت دریافت وجه",
      debtor: 500000,
      creditor: 0,
      debtorBalance: 500000,
    },
    {
      documentNumber: 1002,
      date: "1401/01/02",
      description: "بابت پرداخت وجه",
      debtor: 0,
      creditor: 200000,
      debtorBalance: 300000,
    },
    {
      documentNumber: 1003,
      date: "1401/01/03",
      description: "بابت هزینه خدمات",
      debtor: 100000,
      creditor: 0,
      debtorBalance: 400000,
    },
  ]);

  const total = computed(() =>
    tableData.reduce(
      (totals, row) => {
        totals.debtor += row.debtor || 0;
        totals.creditor += row.creditor || 0;
        totals.debtorBalance += row.debtorBalance || 0;
        return totals;
      },
      { debtor: 0, creditor: 0, debtorBalance: 0 }
    )
  );
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
