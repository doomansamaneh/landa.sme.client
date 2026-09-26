net
<template>
  <div class="q-pb-md q-px-md">
    <!-- Summary Cards -->
    <div v-if="false" class="row q-col-gutter-md q-mb-lg">
      <!-- Revenue -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="summary-card">
          <q-card-section>
            <div class="text-grey-7 text-body2">
              {{ $t("shared.labels.revenue") }}
            </div>

            <div class="text-h6 text-weight-500 q-mt-xs">
              {{ helper.formatNumber(chartStore.revenueTotal.value) }}
            </div>

            <div class="text-caption text-grey-6">
              {{ $t("shared.labels.annualTotal") }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Expense -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="summary-card">
          <q-card-section>
            <div class="text-grey-7 text-body2">
              {{ $t("shared.labels.expense") }}
            </div>

            <div class="text-h6 text-weight-500 q-mt-xs">
              {{ helper.formatNumber(chartStore.expenseTotal.value) }}
            </div>

            <div class="text-caption text-grey-6">
              {{ $t("shared.labels.annualTotal") }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Net Income -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="summary-card">
          <q-card-section>
            <div class="text-grey-7 text-body2">
              {{ $t("shared.columns.netIncome") }}
            </div>

            <div
              class="text-h6 text-weight-500 q-mt-xs"
              :class="
                netIncomeTotal >= 0
                  ? 'text-positive'
                  : 'text-negative'
              "
            >
              {{ helper.formatNumber(netIncomeTotal) }}
            </div>

            <div class="text-caption text-grey-6">
              {{ $t("shared.labels.annualTotal") }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Revenue Average -->
      <div class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="summary-card">
          <q-card-section>
            <div class="text-grey-7 text-body2">
              {{ $t("shared.labels.monthlyAverage") }}
            </div>

            <div class="text-h6 text-weight-500 q-mt-xs">
              {{ helper.formatNumber(revenueAverage) }}
            </div>

            <div class="text-caption text-grey-6">
              {{ $t("shared.labels.revenue") }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Table -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section class="q-pb-sm">
        <!-- Indicators -->
        <div class="row items-center q-gutter-md q-mb-md">
          <div class="indicator">
            <q-icon
              name="arrow_upward"
              class="indicator-up"
              size="16px"
            />
            <span>{{ $t("shared.labels.aboveAverage") }}</span>
          </div>

          <div class="indicator">
            <q-icon
              name="arrow_forward"
              class="indicator-equal"
              size="16px"
            />
            <span>{{ $t("shared.labels.average") }}</span>
          </div>

          <div class="indicator">
            <q-icon
              name="arrow_downward"
              class="indicator-down"
              size="16px"
            />
            <span>
              {{ $t("shared.labels.lessThanAnnualAverage") }}
            </span>
          </div>
        </div>
      </q-card-section>

      <q-markup-table
        bordered
        flat
        class="revenue-expense-table"
        :style="
          $q.lang.rtl ? 'font-family: vazir;' : 'font-family: Roboto;'
        "
      >
        <thead>
          <tr>
            <th class="text-left"></th>

            <th
              v-for="item in helper.getMonths()"
              :key="item"
              class="text-center"
              style="width: 6.2%"
            >
              <span class="text-body2 text-weight-500">
                {{ $t(`shared.months.${item}`) }}
              </span>
            </th>

            <th class="text-left" style="width: 8%">
              <span class="text-body2 text-weight-500">
                {{ $t("shared.labels.total") }}
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Revenue -->
          <tr>
            <td class="text-weight-400">
              {{ $t("shared.labels.revenue") }}
            </td>

            <td
              v-for="(col, index) in revenueRow?.data || []"
              :key="index"
              :class="getColumnClass(revenueRow, col, index)"
            >
              <div class="table-value">
                <q-icon
                  v-if="index < 12"
                  :name="getIndicatorIcon(revenueRow, col)"
                  :class="getIndicatorClass(revenueRow, col)"
                  size="16px"
                />

                <span>
                  {{ helper.formatNumber(col.amount) }}
                </span>
              </div>
            </td>
          </tr>

          <!-- Expense -->
          <tr>
            <td class="text-weight-400">
              {{ $t("shared.labels.expense") }}
            </td>

            <td
              v-for="(col, index) in expenseRow?.data || []"
              :key="index"
              :class="getColumnClass(expenseRow, col, index)"
            >
              <div class="table-value">
                <q-icon
                  v-if="index < 12"
                  :name="getIndicatorIcon(expenseRow, col)"
                  :class="getIndicatorClass(expenseRow, col)"
                  size="16px"
                />

                <span>
                  {{ helper.formatNumber(col.amount) }}
                </span>
              </div>
            </td>
          </tr>

          <!-- Net Income -->
          <tr class="summary-row">
            <td class="bg-grey-2 text-weight-500">
              {{ $t("shared.columns.netIncome") }}
            </td>

            <td
              v-for="(amount, index) in netRevenue"
              :key="index"
              :class="{
                'text-positive': amount > 0,
                'text-negative': amount < 0,
              }"
            >
              <div class="table-value">
                <q-icon v-if="index < 12" size="16px" />

                <span>
                  {{ helper.formatNumber(amount) }}
                </span>
              </div>
            </td>

            <td
              class="text-weight-500"
              :class="{
                'text-positive': netIncomeTotal > 0,
                'text-negative': netIncomeTotal < 0,
              }"
            >
              {{ helper.formatNumber(netIncomeTotal) }}
            </td>
          </tr>

          <!-- Receipt -->
          <tr>
            <td class="text-weight-400">
              {{ $t("shared.labels.receipt") }}
            </td>

            <td
              v-for="(col, index) in receiptRow?.data || []"
              :key="index"
              :class="getColumnClass(receiptRow, col, index)"
            >
              <div class="table-value">
                <q-icon
                  v-if="index < 12"
                  :name="getIndicatorIcon(receiptRow, col)"
                  :class="getIndicatorClass(receiptRow, col)"
                  size="16px"
                />

                <span>
                  {{ helper.formatNumber(col.amount) }}
                </span>
              </div>
            </td>
          </tr>

          <!-- Payment -->
          <tr>
            <td class="text-weight-400">
              {{ $t("shared.labels.payment") }}
            </td>

            <td
              v-for="(col, index) in paymentRow?.data || []"
              :key="index"
              :class="getColumnClass(paymentRow, col, index)"
            >
              <div class="table-value">
                <q-icon
                  v-if="index < 12"
                  :name="getIndicatorIcon(paymentRow, col)"
                  :class="getIndicatorClass(paymentRow, col)"
                  size="16px"
                />

                <span>
                  {{ helper.formatNumber(col.amount) }}
                </span>
              </div>
            </td>
          </tr>

          <!-- Net Cash Flow -->
          <tr class="summary-row">
            <td class="bg-grey-2 text-weight-500">
              {{ $t("shared.labels.netCashFlow") }}
            </td>

            <td
              v-for="(amount, index) in netCashFlow"
              :key="index"
              :class="{
                'text-positive': amount > 0,
                'text-negative': amount < 0,
              }"
            >
              <div class="table-value">
                <q-icon v-if="index < 12" size="16px" />

                <span>
                  {{ helper.formatNumber(amount) }}
                </span>
              </div>
            </td>

            <td
              class="text-weight-500"
              :class="{
                'text-positive': netCashFlowTotal > 0,
                'text-negative': netCashFlowTotal < 0,
              }"
            >
              {{ helper.formatNumber(netCashFlowTotal) }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useRevenueExpense } from "src/components/areas/dashboard/_composables/generalTab/useRevenueExpense";

  const props = defineProps(["dataSource", "dataStore"]);

  const chartStore = useRevenueExpense({
    dataSource: props.dataSource,
    dataStore: props.dataStore,
  });

  /*
   * Revenue / Expense
   */
  const revenueRow = computed(() =>
    chartStore.tableSeries.value.find(
      (row) => row.name === "revenue",
    ),
  );

  const expenseRow = computed(() =>
    chartStore.tableSeries.value.find(
      (row) => row.name === "expense",
    ),
  );

  /*
   * Receipt / Payment
   */
  const receiptRow = computed(() =>
    chartStore.tableSeries.value.find(
      (row) => row.name === "receipt",
    ),
  );

  const paymentRow = computed(() =>
    chartStore.tableSeries.value.find(
      (row) => row.name === "payment",
    ),
  );

  /*
   * Net Income
   * Revenue - Expense
   */
  const netRevenue = computed(() => {
    const revenue = revenueRow.value?.data || [];
    const expense = expenseRow.value?.data || [];

    return revenue
      .slice(0, 12)
      .map(
        (rev, index) =>
          (rev.amount || 0) - (expense[index]?.amount || 0),
      );
  });

  const netIncomeTotal = computed(() =>
    netRevenue.value.reduce((total, value) => total + value, 0),
  );

  /*
   * Net Cash Flow
   * Receipt - Payment
   */
  const netCashFlow = computed(() => {
    const receipt = receiptRow.value?.data || [];
    const payment = paymentRow.value?.data || [];

    return receipt
      .slice(0, 12)
      .map(
        (item, index) =>
          (item.amount || 0) - (payment[index]?.amount || 0),
      );
  });

  const netCashFlowTotal = computed(() =>
    netCashFlow.value.reduce((total, value) => total + value, 0),
  );

  /*
   * Revenue Average
   */
  const revenueAverage = computed(
    () => chartStore.revenueTotal.value / 12,
  );

  /*
   * Column Class
   */
  function getColumnClass(row, column, index) {
    return index === 12 ? "text-weight-500" : "";
  }

  /*
   * Indicator Class
   */
  function getIndicatorClass(row, column) {
    if (!column?.amount) {
      return "";
    }

    const average = row.data[12]?.amount / 12;

    if (!average) {
      return "";
    }

    if (column.amount > average) {
      return "indicator-up";
    }

    if (column.amount < average) {
      return "indicator-down";
    }

    return "indicator-equal";
  }

  /*
   * Indicator Icon
   */
  function getIndicatorIcon(row, column) {
    if (!column?.amount) {
      return "";
    }

    const average = row.data[12]?.amount / 12;

    if (!average) {
      return "";
    }

    if (column.amount > average) {
      return "arrow_upward";
    }

    if (column.amount < average) {
      return "arrow_downward";
    }

    return "arrow_forward";
  }
</script>

<style lang="scss">
  .revenue-expense-table {
    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 1;
      background-color: white;
    }
  }

  .summary-card {
    height: 100%;
    border-radius: 8px;
  }

  .indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: $grey-7;
  }

  .indicator-up {
    color: $positive;
  }

  .indicator-equal {
    color: $primary;
  }

  .indicator-down {
    color: $warning;
  }

  .table-value {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .summary-row {
    font-weight: 500;
    background-color: $grey-2;
  }
</style>
