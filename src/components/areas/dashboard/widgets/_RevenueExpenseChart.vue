<template>
  <template v-if="dataStore.chartSeries?.value">
    <chart
      :options="options"
      :series="dataStore.chartSeries.value"
      :height="height"
      :legend="legend"
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
import { useRevenueExpense } from "src/components/areas/dashboard/_composables/useRevenueExpense";

import Chart from "vue3-apexcharts";
//import Chart from 'src/components/shared/charts/ChartView.vue';

const props = defineProps(["height", "legend", "title"]);

const $q = useQuasar();
const dataStore = useRevenueExpense();

const options = ref(null);

function setOptions() {
  const fontFamily = $q.lang.rtl ? "Vazir FD" : "Roboto";

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
      categories: [
        "فرودین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
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
          return formatYAxisLabel(value);
        },
      },
    },
    legend: {
      show: props.legend,
      inverseOrder: true,
      labels: {
        colors: $q.dark.isActive ? "white" : "#2d2d2d",
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
      enabled: true,
      x: {
        show: true,
      },
      y: {
        show: true,
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

function formatYAxisLabel(value) {
  const parts = String(value).split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let formattedValue = integerPart;

  if (parts.length > 1) {
    formattedValue += "." + parts[1];
  }

  return formattedValue;
}
</script>
