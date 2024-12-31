<template>
  <chart
    :options="options"
    :series="series"
    :legend="legend"
    :title="title"
    class="area-chart"
    :class="direction"
    :height="height"
  />
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import Chart from "src/components/shared/charts/ChartView.vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();
  const props = defineProps(["height", "legend", "title"]);

  const options = ref(null);

  const series = ref([
    {
      name: "مشتری",
      type: "column",
      data: [230, 110, 220, 270, 130, 220, 370, 210, 440, 220, 300],
    },
    {
      name: "کالا و خدمات",
      type: "column",
      data: [404, 550, 410, 607, 202, 430, 210, 410, 506, 270, 430],
    },
  ]);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      chart: {
        fontFamily,
        type: "line",
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
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      stroke: {
        width: 0,
        curve: "smooth",
      },
      plotOptions: {
        line: {
          columnWidth: "40%",
        },
      },

      dataLabels: {
        enabled: false,
      },

      markers: {
        size: 0,
      },
      grid: {
        show: false,
        padding: {
          top: $q.screen.xs ? 100 : 40,
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
        categories: [
          "فروردین",
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
        show: false,
        inverseOrder: true,
        labels: {
          colors: $q.dark.isActive ? "white" : "#2d2d2d",
        },
        position: "top",
        fontSize: "14px",
        fontWeight: 400,
        offsetY: -20,
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

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    gap: 24px;
  }
</style>
