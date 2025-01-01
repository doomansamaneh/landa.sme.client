<template>
  <q-card class="bordered q-pa-xl">
    <Doughnut
      class="doughnut-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { Doughnut } from "vue-chartjs";
  import { useQuasar } from "quasar";

  const props = defineProps({
    name: String,
    number: Number,
    label: String,
  });

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
  } from "chart.js";
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement
  );

  const $q = useQuasar();
  let percentValue = 3;

  const chartData = ref({
    labels: [`${props.label}`],
    datasets: [
      {
        // label: 'My First Dataset',
        fill: false,
        lineTension: 0.0,
        backgroundColor: [
          "rgb(255, 99, 132, 0.5)",
          "rgb(54, 162, 235,0.5)",
          "rgb(255, 205, 86, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
        data: [percentValue, 100 - percentValue],
      },
    ],
  });

  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        rtl: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          color: "black",
          padding: 0,
          font: {
            family: "vazir",
            size: 14,
          },
        },
        title: {
          display: true,
          text: `${props.name} ${props.number}`,
          font: {
            size: 14,
            family: "vazir",
            weight: "bold",
          },
          padding: 24,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        titleColor: "black",
        bodyColor: "black",
        titleFont: {
          family: "vazir",
          size: 12,
        },
        bodyFont: {
          family: "vazir",
          size: 11,
        },
      },
    },
    cutout: 80,
  });

  const isDarkMode = localStorage.getItem("darkMode");

  if (isDarkMode === "true") {
    chartOptions.value.plugins.legend.title.color = "white";
    chartOptions.value.plugins.legend.labels.color = "white";
  } else {
    chartOptions.value.plugins.legend.labels.color = "black";
    chartOptions.value.plugins.tooltip.backgroundColor = "#2d2d2d";
    chartOptions.value.plugins.tooltip.titleColor = "white";
    chartOptions.value.plugins.tooltip.bodyColor = "white";
  }
</script>
