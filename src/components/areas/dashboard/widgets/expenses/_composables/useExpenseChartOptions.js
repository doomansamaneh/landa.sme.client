import { computed } from "vue";
import { helper } from "src/helpers";

export function useExpenseChartOptions(reportStore, $q) {
  const chartOptions = computed(() => {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";
    const total = reportStore.total.value;

    return {
      colors: ["#FF4560", "#00E396", "#775DD0"],
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
                fontFamily,
                fontWeight: 600,
                color: undefined,
                offsetY: 0,
              },
              value: {
                show: true,
                fontSize: "20px",
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
                fontSize: "22px",
                fontFamily,
                fontWeight: 600,
                color: "#373d3f",
              },
            },
          },
        },
      },
      chart: {
        fontFamily,
        type: "donut",
        offsetX: $q.lang.rtl ? ($q.screen.xs ? 40 : -16) : 0,
        offsetY: $q.screen.xs ? -32 : -24,
      },
      labels: reportStore.chartLabels.value,
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
        width: 2,
        colors: $q.dark.isActive ? "var(--q-dark-page)" : "#FFFFFF",
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: true,
        style: {
          fontFamily,
          fontSize: "13px",
        },
        custom: function ({ series, seriesIndex, w }) {
          const color = "#FF4560";
          const percentage = (
            (series[seriesIndex] / total) *
            100
          ).toFixed(2);

          return `
      <div class="q-ml-md" style="font-family: ${fontFamily}; font-size: 13px;">
        <div class="row no-wrap items-center row-reverse">
          <div class="q-mr-sm" style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50px;"></div>
          <div>${w.globals.labels[seriesIndex]}:</div>
          <div class="text-bold q-ml-xs">${helper.formatNumber(
            series[seriesIndex]
          )}</div>
        </div>
        <div class="text-weight-900 text-h3 q-pa-lg no-line-height text-center">${percentage}%</div>
      </div>
    `;
        },
      },
    };
  });

  return {
    chartOptions,
  };
}
