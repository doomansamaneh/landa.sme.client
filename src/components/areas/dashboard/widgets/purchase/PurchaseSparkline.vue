<template>
  <template
    v-if="
      chartStore.chartExpenseSeries &&
      chartStore.chartExpenseSeries.value &&
      isChartVisible
    "
  >
    <chart
      :options="options"
      :series="chartStore.chartExpenseSeries.value"
      :legend="legend"
      :title="title"
      :height="$q.screen.xs ? 150 : 260"
      type="area"
      class="area-chart"
      :class="direction"
      ref="chartRef"
    />
  </template>
</template>

<script setup>
  import {
    ref,
    onMounted,
    watch,
    computed,
    onActivated,
    onDeactivated,
  } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { useRevenueExpenseState } from "../../_composables/generalTab/useRevenueExpenseState";
  import { usePurchaseRevenueExpense } from "../../_composables/purchaseTab/usePurchaseRevenueExpense";

  import Chart from "src/components/shared/charts/ChartView.vue";

  const props = defineProps(["height", "legend", "title"]);

  const $q = useQuasar();
  const { t } = useI18n();
  const chartStore = usePurchaseRevenueExpense(
    useRevenueExpenseState()
  );

  const options = ref(null);
  const chartRef = ref(null);
  const isChartVisible = ref(true);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      title: {
        text: props.title,
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: $q.dark.isActive ? "white" : "#2d2d2d",
        },
      },
      chart: {
        fontFamily,
        type: "area",
        parentHeightOffset: 0,
        sparkline: {
          enabled: true,
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 600,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 450,
          },
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      grid: {
        show: false,
        padding: {
          top: $q.screen.xs ? 0 : 120,
          left: 0,
          right: 0,
          bottom: 0,
        },
        lines: {
          show: false,
        },
        borderColor: $q.dark.isActive ? "#ffffff47" : "#2d2d2d2d",
      },
      xaxis: {
        show: false,
        crosshairs: {
          width: 1,
        },
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
        categories: helper
          .getMonths()
          .map((item) => t(`shared.months.${item}`)),
        labels: {
          show: false,
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
        },
      },
      yaxis: {
        min: 0,
        show: false,
        opposite: false,
        labels: {
          show: false,
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
          formatter: function (value) {
            return helper.formatNumber(value);
          },
        },
      },
      legend: {
        show: props.legend,
        inverseOrder: true,
        labels: {
          colors: $q.dark.isActive ? "white" : "#2d2d2d",
        },
        position: "bottom",
        fontSize: "14px",
        fontWeight: 400,
        offsetY: 16,
        markers: {
          width: 14,
          height: 14,
          radius: 4,
          offsetX: $q.lang.rtl ? "-4" : "-4",
        },
        itemMargin: {
          vertical: 16,
          horizontal: 16,
        },
      },
      colors: ["rgb(255, 99, 132)"],
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: false,
          title: {
            formatter: function (value) {
              //return t(`shared.labels.${value}`) + ": ";
              return "";
            },
          },
        },
        style: {
          fontSize: "13px",
        },
        marker: {
          width: 8,
          height: 8,
        },
      },
    };
  }

  const direction = computed(() => {
    return $q.lang.rtl ? "rtl" : "ltr";
  });

  watch(
    () => $q.dark.isActive,
    () => {
      setOptions();
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }
  );

  watch(
    () => $q.lang.rtl,
    () => {
      setOptions();
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }
  );

  // Handle chart visibility when component is activated/deactivated
  onActivated(() => {
    isChartVisible.value = false;
    // Force a re-render of the chart
    setTimeout(() => {
      isChartVisible.value = true;
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }, 0);
  });

  onDeactivated(() => {
    isChartVisible.value = false;
  });

  onMounted(() => {
    setOptions();
    // Initial chart setup
    if (chartRef.value?.chart) {
      chartRef.value.chart.updateOptions(options.value, true);
    }
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    gap: 24px;
  }
</style>
