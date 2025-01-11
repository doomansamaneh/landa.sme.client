<template>
  <q-card>
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
          <tr v-for="(row, index) in tableData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ row.code }}</td>
            <td>{{ row.title }}</td>
            <td>{{ helper.formatNumber(row.debtor) }}</td>
            <td>{{ helper.formatNumber(row.creditor) }}</td>
            <td>{{ helper.formatNumber(row.debtorBalance) }}</td>
            <td>{{ helper.formatNumber(row.creditorBalance) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-bold" colspan="3" style="text-align: end">
              جمع کل
            </td>
            <td>{{ helper.formatNumber(total.debtor) }}</td>
            <td>{{ helper.formatNumber(total.creditor) }}</td>
            <td>{{ helper.formatNumber(total.debtorBalance) }}</td>
            <td>{{ helper.formatNumber(total.creditorBalance) }}</td>
          </tr>
        </tfoot>
      </table>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";

  const tableData = [
    {
      code: 1,
      title: "دارایی‌های جاری",
      debtor: 77191000,
      creditor: 15974000,
      debtorBalance: 0,
      creditorBalance: 32839000,
    },
    {
      code: 2,
      title: "بدهی‌های جاری",
      debtor: 38301000,
      creditor: 0,
      debtorBalance: 0,
      creditorBalance: 37947000,
    },
    {
      code: 3,
      title: "حقوق صاحبان سهام",
      debtor: 0,
      creditor: 1300000,
      debtorBalance: 8642000,
      creditorBalance: 0,
    },
    {
      code: 4,
      title: "فروش و درآمد",
      debtor: 0,
      creditor: 5801000,
      debtorBalance: 67558850,
      creditorBalance: 0,
    },
    {
      code: 5,
      title: "بهای تمام شده کالای فروش رفته و خدمات ارائه شده",
      debtor: 0,
      creditor: 1000000,
      debtorBalance: 0,
      creditorBalance: 0,
    },
    {
      code: 6,
      title: "هزینه‌ها",
      debtor: 450000,
      creditor: 2585000,
      debtorBalance: 0,
      creditorBalance: 41170200,
    },
  ];

  const total = computed(() =>
    tableData.reduce(
      (totals, row) => {
        totals.debtor += row.debtor || 0;
        totals.creditor += row.creditor || 0;
        totals.debtorBalance += row.debtorBalance || 0;
        totals.creditorBalance += row.creditorBalance || 0;
        return totals;
      },
      {
        debtor: 0,
        creditor: 0,
        debtorBalance: 0,
        creditorBalance: 0,
      }
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
