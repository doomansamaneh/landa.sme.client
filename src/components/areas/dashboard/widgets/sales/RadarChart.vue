<template>
  <div
    :class="$q.screen.gt.sm ? 'absolute-top-right q-mt-sm' : ''"
    :style="$q.screen.gt.xs ? 'width: 300px' : 'width: 250px'"
  >
    <apex-chart
      class="radar-chart"
      type="radar"
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

  // Radar chart data structure
  const chartData = ref([
    {
      name: "Series 1",
      data: [4070, 500, 130, 400, 3000],
    },
    {
      name: "Series 2",
      data: [407, 508, 1030, 4000, 3000],
    },
  ]);

  const chartOptions = computed(() => {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    return {
      chart: {
        offsetY: -38,
        fontFamily,
        toolbar: {
          show: false,
        },
      },
      colors: ["#00E396", "#775DD0"],
      stroke: {
        width: 2,
        curve: "smooth",
      },
      fill: {
        opacity: 1,
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: [
          "هزینه کسری کالا",
          "هزینه های بازاریابی و پورسانت",
          "هزینه کارمزد وام ها و خدمات بانکی",
          "هزینه نوسازی مسکن",
          "هزینه راه سازی",
        ],
        labels: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "center",
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontFamily,
        },
      },
      grid: {
        borderColor: "red",
      },
    };
  });
</script>
