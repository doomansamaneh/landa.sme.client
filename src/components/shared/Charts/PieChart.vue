<template>
  <chart
    :options="options"
    :series="series"
    :height="height"
    :legend="legend"
    :title="title"
    class="donut-chart"
    :class="direction"
  />
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import Chart from "src/components/shared/Charts/ChartView.vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();
  const props = defineProps(["height", "legend", "title"]);

  const options = ref(null);

  const series = ref([200000000, 40000000, 800000000]);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      labels: ["شماره حساب بانک آینده: 123456789"],
      title: {
        text: props.title,
        align: "top",
        margin: 0,
        offsetX: 0,
        offsetY: 0,
        floating: true,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: $q.dark.isActive ? "white" : "#2d2d2d",
        },
      },
      chart: {
        offsetY: 4,
        fontFamily,
        type: "pie",
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
        pie: {
          // customScale: 1,
          // expandOnClick: false,
          // donut: {
          //   size: '75%',
          //   labels: {
          //     show: true,
          //     total: {
          //       show: true,
          //       label: $q.lang.rtl ? 'مجموع' : 'Total',
          //       color: $q.dark.isActive ? 'white' : '#2d2d2d',
          //       fontSize: '16px',
          //       formatter: function (w) {
          //         const totalSum = w.globals.seriesTotals.reduce((a, b) => {
          //           return a + b;
          //         }, 0);
          //         return totalSum.toLocaleString();
          //       }
          //     },
          //     value: {
          //       show: true,
          //       fontSize: '16px',
          //       fontWeight: 600,
          //       color: $q.dark.isActive ? 'white' : '#2d2d2d',
          //       offsetY: 4,
          //       formatter: function (value) {
          //         return formatLabel(value);
          //       },
          //     },
          //     name: {
          //       show: false,
          //     }
          //   }
          // }
        },
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: "gradient",
      },
      stroke: {
        show: false,
        width: 6,
        colors: $q.dark.isActive ? "red" : "white",
      },
      markers: {
        size: 0,
      },
      legend: {
        show: props.legend,
        showForSingleSeries: true,
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
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
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

  function formatLabel(value) {
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

<style></style>
