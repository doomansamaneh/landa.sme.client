<template>
  <chart
    :options="options"
    :series="series"
    :seriesName="seriesName"
    :height="height"
    :legend="legend"
    :title="title"
    class="bar-chart"
    :class="direction"
  />
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import Chart from "src/components/shared/Charts/ChartView.vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();
  const props = defineProps([
    "height",
    "legend",
    "title",
    "seriesName",
  ]);

  const options = ref(null);

  const series = ref([
    {
      name: props.seriesName,
      data: [
        20000000, 40000000, 60000000, 8000000, 10000000, 12000000,
        14000000, 16000000, 18000000,
      ],
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
          columnWidth: "45%",
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
        categories: [
          "موز",
          "استیل البرز",
          "عایق رطوبتی نانو",
          "اشتراک لاندا نسخه حرفه ای",
          "تجهیزات شبکه",
          "طراحی لوگو",
          "ادکلن مردانه",
          "کفی ساینا",
          "تلفن ماهواره ای",
        ],
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
          horizontal: 16,
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
</script>
