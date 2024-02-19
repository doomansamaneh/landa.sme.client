<template>
  <div class="markup-table-container q-pa-lg">
    <div class="q-mb-md">
      <q-badge color="secondary" rounded class="q-mr-sm" />کمتر از میانگین
    </div>
    <q-markup-table class="no-shadow" bordered flat>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">فروردین</th>
          <th class="text-left">اردیبهشت</th>
          <th class="text-left">خرداد</th>
          <th class="text-left">تیر</th>
          <th class="text-left">مرداد</th>
          <th class="text-left">شهریور</th>
          <th class="text-left">مهر</th>
          <th class="text-left">آبان</th>
          <th class="text-left">آذر</th>
          <th class="text-left">دی</th>
          <th class="text-left">بهمن</th>
          <th class="text-left">اسفند</th>
          <th class="text-left">جمع</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in dataStore.tableSeries.value" :key="row.name">
          <td>{{ row.name }}</td>
          <td
            v-for="(col, index) in row.data"
            :key="index"
            :class="getColumnClass(row, col)"
          >
            {{ col.amount.toLocaleString() }}
          </td>
          <!-- <td>
            {{ helper.getSubtotal(row.data, "amount").toLocaleString() }}
          </td> -->
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";

const dataStore = useRevenueExpense();

// async function loadData() {
//   const response = await fetchWrapper.get(`acc/report/RevenueExpenseByMonth`);
//   const items = response.data.data;
//   items.forEach((row) => {
//     row.data.push({
//       label: "total",
//       amount: helper.getSubtotal(row.data, "amount"),
//     });
//   });
//   data.value = items;
// }

function getColumnClass(row, column) {
  return row.data[12].amount / 12 > column.amount ? "less-than-average" : "";
}
</script>
<style scss>
.less-than-average {
  background-color: var(--q-secondary) !important;
}
</style>
