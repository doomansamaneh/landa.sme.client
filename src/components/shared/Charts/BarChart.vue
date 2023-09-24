<template>
  <q-card class="no-shadow q-pa-xl">
    <Bar
      class="bar-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Bar } from "vue-chartjs"
import { useQuasar } from "quasar"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
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
    borderWidth: 1,
    barPercentage: 0.5,
    barThickness: 48,
    maxBarThickness: 48,
    minBarLength: 32,
    borderRadius: 8,
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
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
      stacked: true,
      ticks: {
        color: 'black',
      },
      grid: {
        display: false,
        offset: true,
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        color: 'black',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'black',
      },
    },
    // tooltip: {
    //     backgroundColor: 'red'
    //   }
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
