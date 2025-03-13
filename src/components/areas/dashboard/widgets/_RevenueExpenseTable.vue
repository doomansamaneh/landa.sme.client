<template>
  <div class="q-pb-md q-px-md">
    <div class="q-mb-md">
      <q-badge color="warning" rounded class="q-mr-sm" />
      کمتر از میانگین سالانه (میانگین از تقسیم جمع هر ردیف بر تعداد 12
      ماه بدست می‌آید)
    </div>
    <q-markup-table bordered flat class="revenue-expense-table">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th
            class="text-center"
            style="width: 6.2%"
            v-for="item in helper.getMonths()"
            :key="item"
          >
            <span class="text-body2 text-weight-500">
              {{ $t(`shared.months.${item}`) }}
            </span>
          </th>
          <th class="text-left" style="width: 8%">
            <span class="text-body2 text-weight-500">جمع</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in chartStore.tableSeries.value"
          :key="row.name"
        >
          <td class="text-black text-weight-400">
            {{ $t(`shared.labels.${row.name}`) }}
          </td>
          <td
            v-for="(col, index) in row.data"
            :key="index"
            :class="getColumnClass(row, col, index)"
          >
            {{ helper.formatNumber(col.amount) }}
            <q-badge
              v-if="showWarning(row, col, index)"
              color="warning"
              rounded
              class="q-mr-sm"
            />
          </td>
        </tr>

        <tr v-if="netRevenue">
          <td class="text-black text-body2 text-weight-500 bg-lime">
            درآمد خالص
          </td>
          <td
            v-for="(col, index) in netRevenue"
            :key="index"
            :class="getColumnClass(row, col, index)"
            class="bg-lime text-black"
          >
            {{ helper.formatNumber(col) }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";

  const props = defineProps(["dataSource", "dataStore"]);

  const chartStore = useRevenueExpense({
    dataSource: props.dataSource,
    dataStore: props.dataStore,
  });

  const netRevenue = computed(() => {
    const revenue =
      chartStore.tableSeries.value.find(
        (row) => row.name === "revenue"
      )?.data || [];
    const expense =
      chartStore.tableSeries.value.find(
        (row) => row.name === "expense"
      )?.data || [];

    return revenue.map(
      (rev, i) => rev.amount - (expense[i]?.amount || 0)
    );
  });

  function getColumnClass(row, column, index) {
    return index === 12 ? "text-weight-500" : "";
  }

  const showWarning = (row, column, index) => {
    return row.data[12].amount / 12 > column.amount;
  };
</script>

<style lang="scss">
  .revenue-expense-table {
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
      background-color: $lime;
    }
  }
</style>
