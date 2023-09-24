<template>
  <q-card class="no-shadow q-pa-xl">
    <Line
      class="line-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Line } from "vue-chartjs"
import { useQuasar } from "quasar"

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const $q = useQuasar()

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'January',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 2,
    borderRadius: 4,
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
        color: 'black',
      },
      grid: {
        // color: 'lightgrey',
        display: false,
      },
    },
    y: {
      ticks: {
        color: 'black',
      },
      grid: {
        // color: 'lightgrey',
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
