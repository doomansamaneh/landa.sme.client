<template>
  <div
    :class="
      $q.screen.gt.sm ? 'absolute-top-left' : 'absolute-top-left'
    "
    :style="$q.screen.gt.xs ? 'width: 320px' : 'width: 280px'"
  >
    <apex-chart
      class="pie-chart"
      type="donut"
      :options="chartOptions"
      :series="chartData"
    />
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import ApexChart from "vue3-apexcharts";

  const $q = useQuasar();

  const chartData = ref([47, 5, 13, 4, 3]);

  const chartOptions = computed(() => {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";
    const total = chartData.value.reduce((a, b) => a + b, 0);

    return {
      colors: ["#607d8b", "#00E396", "#775DD0"],
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
                fontSize: "32px",
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
                fontSize: "28px",
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
        offsetX: $q.lang.rtl ? ($q.screen.xs ? 20 : 10) : 0,
        offsetY: $q.screen.xs ? 40 : -32,
      },
      labels: [
        "هزینه کسری کالا",
        "هزینه های بازاریابی و پورسانت",
        "هزینه کارمزد وام ها و خدمات بانکی",
        "هزینه نوسازی مسکن",
        "هزینه راه سازی",
      ],
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
          const color = w.config.colors[seriesIndex];
          const percentage = (
            (series[seriesIndex] / total) *
            100
          ).toFixed(2);

          return `
      <div class="q-ml-md">
        <div class="row no-wrap items-center row-reverse">
          <div class="q-mr-sm" style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50px;"></div>
        <div>${w.globals.labels[seriesIndex]}:</div>
        <div class="text-bold q-ml-xs">${series[seriesIndex]}</div>
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
</script>
