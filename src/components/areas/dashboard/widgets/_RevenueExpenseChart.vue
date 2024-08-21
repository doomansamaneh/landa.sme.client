<template>
  <q-inner-loading
    :showing="chartStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner size="52px" color="primary" />
  </q-inner-loading>

  <template v-if="chartStore.chartSeries?.value">
    <chart
      :options="options"
      :series="chartStore.chartSeries.value"
      :height="height"
      :legend="false"
      :title="title"
      :class="direction"
      type="area"
      class="line-chart"
    />
  </template>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { helper } from "src/helpers";
  import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";

  import Chart from "src/components/shared/Charts/ChartView.vue";

  const props = defineProps({
    height: Number,
    legend: Boolean,
    title: String,
    dataSource: String,
    dataStore: Object,
  });

  const $q = useQuasar();
  const { t } = useI18n();
  const chartStore = useRevenueExpense({
    dataSource: props.dataSource,
    dataStore: props.dataStore,
  });

  const options = ref(null);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir-thin" : "Roboto";

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
          top: 100,
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
        axisBorder: {
          show: false,
        },
        axisTicks: {
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
        formatter: function (value) {
          return t(`shared.labels.${value}`);
        },
        position: "top",
        fontSize: "14px",
        fontWeight: 400,
        // offsetY: 16,
        markers: {
          width: 14,
          height: 14,
          radius: 4,
          offsetX: $q.lang.rtl ? "-4" : "-4",
        },
        itemMargin: {
          // vertical: 16,
          horizontal: 16,
        },
      },
      colors: [
        "rgb(0, 255, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 155, 227)",
        "rgb(36, 183, 160)",
      ],
      tooltip: {
        x: {
          show: true,
        },
        y: {
          show: true,
          title: {
            formatter: function (value) {
              return t(`shared.labels.${value}`) + ": ";
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
    }
  );

  watch(
    () => $q.lang.rtl,
    () => {
      setOptions();
    }
  );

  onMounted(() => {
    setOptions();
  });
</script>
