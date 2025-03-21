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
        <div class="row justify-between items-center">
          <widget-title label="فروش و درآمد" icon="receipt_long" />
          <div class="col-5" v-if="false">
            <q-select
              dropdown-icon="o_expand_more"
              class="select"
              outlined
              dense
              v-model="filter"
              :options="filterOptions"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="row q-col-gutter-md q-pt-md q-px-lg">
        <div class="col-md-8 col-xs-12">
          <div class="text-h3 text-weight-700">
            {{
              helper.formatNumberReadable(
                revenueExpenseStore.revenueTotal?.value
              )
            }}
          </div>
        </div>
        <div
          :class="$q.screen.gt.xs ? 'absolute-top-right q-mt-xl' : ''"
          :style="$q.screen.gt.xs ? 'width: 250px' : 'width: 250px'"
        >
          <template v-if="reportStore.chartSeries?.value">
            <apex-chart
              class="pie-chart"
              type="pie"
              :options="chartOptions"
              :series="reportStore.chartSeries.value"
            />
          </template>
        </div>
      </q-card-section>

      <sales-sparkline />
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import { helper } from "src/helpers";
  import { useReport } from "src/components/areas/sls/_composables/useReport";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/useGeneralTab";
  import { useRevenueExpenseState } from "../../_composables/useRevenueExpenseState";
  import { useRevenueExpense } from "../../_composables/useRevenueExpense";

  import ApexChart from "vue3-apexcharts";
  import SalesSparkline from "./SalesSparkline.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const $q = useQuasar();
  const draggable = useGeneralTab();
  const reportStore = useReport("invoiceByProduct");
  const revenueExpenseStore = useRevenueExpense(
    useRevenueExpenseState()
  );

  const filter = ref("30 روز پیش");
  const filterOptions = ["30 روز پیش", "این فصل", "امسال", "سال پیش"];

  const chartOptions = computed(() => {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";
    const total = reportStore.total.value;

    return {
      colors: ["#FF4560", "#00E396", "#775DD0"],
      plotOptions: {
        pie: {
          customScale: 1,
          expandOnClick: true,
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: false,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: undefined,
                offsetY: 0,
                //   formatter: function (val) {
                //     return val * 100 / total;
                //   },
              },
              value: {
                show: true,
                fontSize: "20px",
                fontFamily,
                fontWeight: 600,
                color: $q.dark.isActive ? "white" : "#222",
                offsetY: 6,
                formatter: function (val) {
                  const value = ((val * 100) / total).toFixed(0);
                  return `${value}%`;
                },
              },
              total: {
                show: false,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 600,
                color: "#373d3f",
                //   formatter: () => {
                //     const compute = total / 100;
                //     return `${compute}%e`;
                //   },
              },
            },
          },
        },
      },
      chart: {
        fontFamily,
        type: "donut",
        offsetX: $q.lang.rtl ? ($q.screen.xs ? 40 : -16) : 0,
        offsetY: $q.screen.xs ? -32 : -24,
      },
      labels: reportStore.chartLabels.value,
      dataLabels: {
        enabled: false,
        enabledOnSeries: undefined,
        textAnchor: "middle",
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "16px",
          fontFamily,
          fontWeight: "normal",
          colors: undefined,
        },
        background: {
          enabled: true,
          foreColor: "#fff",
          padding: 4,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: "#fff",
          opacity: 1,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45,
          },
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      stroke: {
        show: true,
        width: 6,
        colors: $q.dark.isActive ? "var(--q-dark-page)" : "white",
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, w }) {
          //const color = w.config.colors[seriesIndex];
          const color = "#FF4560";
          const percentage = (
            (series[seriesIndex] / total) *
            100
          ).toFixed(2);

          return `
      <div class="q-ml-md">
        <div class="row no-wrap items-center row-reverse">
          <div class="q-mr-sm" style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50px;"></div>
        <div>${w.globals.labels[seriesIndex]}:</div>
        <div class="text-bold q-ml-xs">${helper.formatNumber(
          series[seriesIndex]
        )}</div>
        </div>
        <div class="text-h3 q-pa-lg no-line-height text-center text-weight-900">${percentage}%</div>
      </div>
    `;
        },
        style: {
          fontFamily,
          fontSize: "13px",
        },
        marker: {
          width: 8,
          height: 8,
        },
      },
    };
  });

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
