<template>
  <div class="markup-table-container q-pa-lg">
    <div class="q-mb-md">
      <q-badge color="warning" rounded class="q-mr-sm" />
      کمتر از میانگین سالانه (میانگین از تقسیم جمع هر ردیف بر تعداد 12
      ماه بدست می‌آید)
    </div>
    <q-markup-table bordered flat>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th
            class="text-center"
            style="width: 5%"
            v-for="item in helper.getMonths()"
            :key="item"
          >
            <span class="text-caption">
              {{ $t(`shared.months.${item}`) }}
            </span>
          </th>
          <th class="text-left" style="width: 8%">
            <span class="text-subtitle2 text-weight-500">جمع</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in dataStore.tableSeries.value"
          :key="row.name"
        >
          <td>{{ $t(`shared.labels.${row.name}`) }}</td>
          <td
            v-for="(col, index) in row.data"
            :key="index"
            :class="getColumnClass(row, col, index)"
          >
            {{ col.amount.toLocaleString() }}
            <q-badge
              v-if="showWarning(row, col, index)"
              color="warning"
              rounded
              class="q-mr-sm"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script setup>
  import { helper } from "src/helpers";
  import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";

  const dataStore = useRevenueExpense();

  function getColumnClass(row, column, index) {
    return (
      // (row.data[12].amount / 12 > column.amount
      //   ? "less-than-average"
      //   : "") +
      index === 12 ? "text-weight-500" : ""
    );
  }

  const showWarning = (row, column, index) => {
    return row.data[12].amount / 12 > column.amount;
  };
</script>
<style scss>
  .less-than-average {
    background-color: var(--q-secondary) !important;
    color: #fff;
  }
</style>
