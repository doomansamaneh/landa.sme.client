<template>
  <q-card
    v-access="`acc.report.accountReview`"
    :class="[isShakingComputed ? 'widget' : '']"
    class="fit shadow main-card fit bordered q-pa-none"
    flat
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
      <q-card-section class="col">
        <div class="row q-gutter-md justify-between">
          <div class="col-9">
            <widget-title label="هزینه‌" icon="o_account_balance" />
          </div>
        </div>
      </q-card-section>
      <q-inner-loading
        :showing="chartStore.showLoader.value"
        class="transparent z-1"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>

      <template
        v-if="chartStore.chartSeries?.value && isChartVisible"
      >
        <chart
          height="300"
          :series="chartStore.chartSeries?.value"
          :options="options"
          class="bar-chart"
          :class="direction"
          ref="chartRef"
        />
      </template>
    </div>
  </q-card>
</template>

<script setup>
  import {
    ref,
    watch,
    onMounted,
    computed,
    onActivated,
    onDeactivated,
  } from "vue";
  import { useQuasar } from "quasar";
  import { useTopExpenseByCL } from "src/components/areas/dashboard/_composables/expenseTab/useTopExpenseByCL";
  import { useExpenseTab } from "../../_composables/expenseTab/useExpenseTab";

  import Chart from "src/components/shared/charts/ChartView.vue";
  import WidgetTitle from "../WidgetTitle.vue";

  const $q = useQuasar();
  const draggable = useExpenseTab();
  const chartStore = useTopExpenseByCL({});

  const options = ref(null);
  const chartRef = ref(null);
  const isChartVisible = ref(true);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: $q.dark.isActive ? "white" : "#2d2d2d",
        },
      },
      chart: {
        offsetY: 0,
        parentHeightOffset: 0,
        fontFamily,
        type: "bar",
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
      plotOptions: {
        bar: {
          columnWidth: "10px",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      grid: {
        strokeDashArray: 5,
        borderColor: $q.dark.isActive ? "#ffffff47" : "#2d2d2d2d",
        padding: {
          top: 0,
          right: 32,
          bottom: 8,
          left: 32,
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: chartStore.chartCategories?.value,
        labels: {
          show: true,
          offsetY: 12,
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
        },
      },
      yaxis: {
        show: false,
        opposite: false,
        labels: {
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
          formatter: function (value) {
            return formatYAxisLabel(value);
          },
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        fontFamily,
        labels: {
          colors: $q.dark.isActive ? "#fff" : "#000",
        },
        markers: {
          width: 12,
          height: 12,
          strokeWidth: 0,
          radius: 12,
        },
        itemMargin: {
          horizontal: 8,
          vertical: 5,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: true,
          title: {
            formatter: (seriesName) => seriesName == "",
          },
        },
        style: {
          fontSize: "13px",
        },
        marker: {
          width: 8,
          height: 8,
        },
        intersect: false,
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
    }
  );

  watch(
    () => chartStore.chartCategories?.value,
    () => {
      setOptions();
    },
    { deep: true }
  );

  onActivated(() => {
    isChartVisible.value = false;
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
    if (chartRef.value?.chart) {
      chartRef.value.chart.updateOptions(options.value, true);
    }
  });

  function formatYAxisLabel(value) {
    const parts = String(value).split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    let formattedValue = integerPart;

    if (parts.length > 1) {
      formattedValue += "." + parts[1];
    }

    return formattedValue;
  }

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
