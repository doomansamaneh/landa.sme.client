<template>
  <q-card class="no-shadow q-pa-xl">
    <Pie
      class="pie-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </q-card>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Pie } from "vue-chartjs"
import { useQuasar } from "quasar"

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const $q = useQuasar()

const chartData = ref({
  labels: [
    'شماره حساب بانک آینده - حساب جاری'
  ],
  datasets: [{
    label: 'My First Dataset',
    backgroundColor: [
      'rgb(255, 99, 132, 0.5)',
      'rgb(54, 162, 235,0.5)',
      'rgb(255, 205, 86, 0.5)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4,
    data: [40, 39, 10, 40, 39, 80, 40]
  }],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'black',
        padding: 4,
        font: {
          family: 'Vazir FD',
          size: 14,
        },
      },
      title: {
        display: true,
        text: `موجودی بانک ${1717500}`,
        font: {
          size: 16,
          family: 'Vazir FD',
          weight: 'bold'
        },
        padding: 20,
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      titleColor: 'black',
      bodyColor: 'black',
      titleFont: {
        family: 'Vazir FD',
        size: 12,
      },
      bodyFont: {
        family: 'Vazir FD',
        size: 11,
      },
    },
  },
});

const isDarkMode = localStorage.getItem('darkMode')

if (isDarkMode === "true") {
  chartOptions.value.plugins.legend.labels.color = 'white';
  chartOptions.value.plugins.legend.title.color = 'white';


} else {
  chartOptions.value.plugins.legend.labels.color = 'black';
  chartOptions.value.plugins.tooltip.backgroundColor = '#2d2d2d';
  chartOptions.value.plugins.tooltip.titleColor = 'white';
  chartOptions.value.plugins.tooltip.bodyColor = 'white';
}

</script>
