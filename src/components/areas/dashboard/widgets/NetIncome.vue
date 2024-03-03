<template>
  <q-card class="fit bordered no-padding">
    <q-card-section class="q-pa-lg">
      <div class="row full-width">
        <div class="col column q-gutter-y-sm">
          <span class="text-body1">درآمد خالص</span>
          <div class="row q-gutter-x-sm text-body1 text-bold">
            <span class="text-body1 text-bold">(5,004,002,500)</span>
            <span class="text-body3 text-bold text-green">+%24</span>
          </div>
          <q-item-label caption>رشد نسبت به پارسال سنجیده شده</q-item-label>
          <q-btn class="q-mt-lg primary-shadow text-body3" rounded unelevated color="primary"
            style="width: 120px">جزئیات بیشتر</q-btn>
        </div>
        <div class="col-4">
          <vue-apex-charts ref="incomeChart" :options="options" :series="series" height="140" :legend="legend"
            :title="title" class="bar-chart" :class="direction" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useQuasar } from "quasar";

//import Chart from 'src/components/shared/charts/ChartView.vue'
import VueApexCharts from "vue3-apexcharts";

const props = defineProps(["legend", "title"]);

const $q = useQuasar();
const incomeChart = ref(null);

const options = ref(null);

const chartOptions = {
  chart: {
    id: "basic-line",
  },
  xaxis: {
    categories: [1991, 1992],
  },
};

const series = ref([
  {
    name: "درآمد خالص",
    data: [2500000000, 5004002500],
  },
]);

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
        // borderRadius: 5,
        // horizontal: false,
        columnWidth: "20%",
        // distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    // stroke: {
    //   width: 2.5,
    // },
    markers: {
      size: 0,
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      borderColor: $q.dark.isActive ? "#ffffff47" : "#2d2d2d2d",
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ["پارسال", "امسال"],
      labels: {
        show: false,
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
      show: props.legend,
      showForSingleSeries: true,
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
        // horizontal: 16,
      },
    },
    // colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
    //   '#f48024', '#69d2e7'
    // ],
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
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetX: 0,
        offsetY: 0,
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

function changeSeris() {
  series.value[0].data = [1200000000, 500000];
  //console.log(incomeChart.value)
}
</script>
