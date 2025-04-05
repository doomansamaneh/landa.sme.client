<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow border-radius-lg bordered"
  >
    <template v-if="isShakingComputed">
      <q-btn
        class="off-btn bordered absolute-top-right q-ma-sm z-1"
        round
        dense
        unelevated
        @click="hideWidget"
      >
        <q-icon name="o_visibility_off" />
      </q-btn>
    </template>

    <div
      :class="
        isShakingComputed ? 'no-pointer-events' : 'pointer-events-all'
      "
    >
      <q-card-section class="q-pb-none">
        <widget-title label="هزینه ها" icon="o_receipt_long" />
      </q-card-section>

      <q-inner-loading
        :showing="reportStore?.showLoader?.value"
        class="transparent z-1"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>

      <q-card-section class="row q-col-gutter-md q-pt-md q-px-lg">
        <div class="col-md-8 col-xs-12">
          <div class="text-h3 text-weight-700">
            {{
              formatExpense(revenueExpenseStore.expenseTotal?.value)
            }}
          </div>
        </div>
        <div
          :class="$q.screen.gt.xs ? 'absolute-top-right q-mt-xl' : ''"
          :style="{ width: '250px' }"
        >
          <apex-chart
            v-if="reportStore.chartSeries?.value && isChartVisible"
            class="pie-chart"
            type="donut"
            :options="chartOptions"
            :series="reportStore.chartSeries.value"
            ref="chartRef"
          />
        </div>
      </q-card-section>

      <expense-sparkline />
    </div>
  </q-card>
</template>

<script setup>
  import {
    computed,
    ref,
    onMounted,
    onActivated,
    onDeactivated,
  } from "vue";
  import { useQuasar } from "quasar";

  import { helper } from "src/helpers";
  import { useBankAccount } from "src/components/areas/acc/_composables/useBankAccount";
  import { useExpenseTab } from "src/components/areas/dashboard/_composables/expenseTab/useExpenseTab";
  import { useRevenueExpenseState } from "../../_composables/generalTab/useRevenueExpenseState";
  import { useRevenueExpense } from "../../_composables/generalTab/useRevenueExpense";
  import { useExpenseChartOptions } from "./_composables/useExpenseChartOptions";

  import ApexChart from "vue3-apexcharts";
  import ExpenseSparkline from "./ExpenseSparkline.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const $q = useQuasar();
  const draggable = useExpenseTab();
  const reportStore = useBankAccount("TopExpenseByCL");
  const revenueExpenseStore = useRevenueExpense(
    useRevenueExpenseState()
  );

  const { chartOptions } = useExpenseChartOptions(reportStore, $q);
  const chartRef = ref(null);
  const isChartVisible = ref(true);

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );

  const formatExpense = (value) => helper.formatNumberReadable(value);

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  onActivated(() => {
    isChartVisible.value = false;
    setTimeout(() => {
      isChartVisible.value = true;
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(chartOptions.value, true);
      }
    }, 0);
  });

  onDeactivated(() => {
    isChartVisible.value = false;
  });

  onMounted(() => {
    if (chartRef.value?.chart) {
      chartRef.value.chart.updateOptions(chartOptions.value, true);
    }
  });
</script>
