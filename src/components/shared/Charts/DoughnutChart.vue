<template>
  <q-card class="no-shadow q-pa-xl">
    <Doughnut
      class="doughnut-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Doughnut } from "vue-chartjs"
import { useQuasar } from "quasar"

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const $q = useQuasar()

const chartData = ref({
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4,
    fill: false,
    tension: 0.5,
    data: [40, 39, 10, 40, 39, 80, 40]
  }],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: 'black',
      },
    },
  },
});

const isDarkMode = localStorage.getItem('darkMode')

if (isDarkMode === "true") {

  chartOptions.value.scales.x.ticks.color = 'white';
  chartOptions.value.scales.y.ticks.color = 'white';
  chartOptions.value.plugins.legend.labels.color = 'white';

} else {
  chartOptions.value.scales.x.ticks.color = 'black';
  chartOptions.value.scales.y.ticks.color = 'black';
  chartOptions.value.plugins.legend.labels.color = 'black';
}

</script>
