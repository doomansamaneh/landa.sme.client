<template>
  <chart
    :options="options"
    :series="series"
    :height="height"
    :legend="legend"
    :title="title"
    class="line-chart"
    :class="direction"
  />
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useQuasar } from "quasar";

  import Chart from "src/components/shared/charts/ChartView.vue";

  const $q = useQuasar();
  const props = defineProps(["height", "legend", "title"]);

  const options = ref(null);

  const series = ref([
    {
      name: "دریافت",
      data: [
        32000000, 89000000, 45000000, 1000000, 98000000, 23000000,
        56000000, 64000000, 12000000, 79000000, 75000000, 42000000,
      ],
    },
    {
      name: "پرداخت",
      data: [
        19000000, 56000000, 23000000, 8000000, 32000000, 46000000,
        98000000, 7600000, 42000000, 13000000, 7800000, 6500000,
      ],
    },
    {
      name: "هزینه",
      data: [
        90000000, 65000000, 1000000, 5000000, 23000000, 97000000,
        12300000, 89000000, 45000000, 31000000, 76000000, 43000000,
      ],
    },
    {
      name: "income",
      data: [
        2000000, 5000000, 2000000, 8000000, 3000000, 4000000, 9000000,
        7000000, 4000000, 13000000, 7000000, 6000000,
      ],
    },
  ]);

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
        // crosshairs: {
        //   width: 1
        // },
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: [
          "farvardin",
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

    //   // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //   //   let tooltipText = '<div class="apex-custom-tooltip column q-gutter-y-sm q-pa-md">';
    //   //   series.forEach((singleSeries, index) => {
    //   //     tooltipText += `<span>
    //   //       ${w.config.series[index].name}: ${singleSeries[dataPointIndex].toLocaleString()}
    //   //   </span>`;
    //   //   });
    //   //   tooltipText += '</div>';
    //   //   return tooltipText;
    //   // }

    // },

    // colors: ["rgb(0, 255, 0)", "rgb(255, 0, 0)", "rgb(0, 155, 227)", "rgb(36, 183, 160)"],
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
