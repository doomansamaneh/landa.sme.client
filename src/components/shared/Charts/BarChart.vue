<template>
  <q-card class="no-shadow q-pa-lg">
    <Bar
      class="bar-chart"
      :options="chartOptions"
      :data="chartData"
      :style="myStyles"
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

const height = ref(400)

const myStyles = {
  height: `${height.value}px`,
  position: 'relative',
}

const chartData = ref({
  labels: ['شرکت سامانه های هوشمند نسل سوم', 'Key Store', 'انجمن عایق های رطوبتی استان مرکزی', 'نمایندگی آزمایشگاه مصالح ساختمانی', 'خشایار شمالی', 'بانک ملی ایران', 'ایران رایانه'],
  datasets: [{
    label: 'مشتری',
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderWidth: 2,
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
    data: [20000000, 40000000, 60000000, 8000000, 10000000, 12000000, 14000000, 16000000, 18000000]
  }],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        font: {
          family: 'Vazir FD',
          size: 12,
        },
      },
      grid: {

      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          family: 'Vazir FD',
          size: 12,
        },
      },
      grid: {

      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'black',
        padding: 42,
        font: {
          family: 'Vazir FD',
          size: 14,
        },
      },
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

  chartOptions.value.scales.x.ticks.color = 'white';
  chartOptions.value.scales.y.ticks.color = 'white';
  chartOptions.value.scales.x.grid.color = 'rgba(255,255,255,0.2)';
  chartOptions.value.scales.y.grid.color = 'rgba(255,255,255,0.2)';
  chartOptions.value.plugins.legend.labels.color = 'white';

} else {
  chartOptions.value.scales.x.ticks.color = 'black';
  chartOptions.value.scales.y.ticks.color = 'black';
  chartOptions.value.plugins.legend.labels.color = 'black';
  chartOptions.value.plugins.tooltip.backgroundColor = '#2d2d2d';
  chartOptions.value.plugins.tooltip.titleColor = 'white';
  chartOptions.value.plugins.tooltip.bodyColor = 'white';
}

</script>
