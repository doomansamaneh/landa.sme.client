<template>
  <Bar
    class="bar-chart"
    :options="chartOptions"
    :data="chartData"
    :style="myStyles"
  />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Bar } from "vue-chartjs"
import { useQuasar } from "quasar"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const props = defineProps({
  name: String,
  label: String,
  hasName: Boolean,
  hasLabel: Boolean,
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const $q = useQuasar()

const height = ref(400)

const myStyles = {
  height: `${height.value}px`,
  position: 'relative',
}

const chartData = ref({
  labels: ['موز', 'اشتراک لاندا نسخه حرفه ای', 'تجهیزات شبکه', 'طراحی لوگو', 'ادکلن مردانه', 'کفی ساینا', 'تلفن ماهواره ای'],
  datasets: [{
    label: `${props.name}`,
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
      rtl: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 6,
        boxHeight: 6,
        color: 'black',
        padding: 32,
        font: {
          family: 'Vazir FD',
          size: 14,
        },
      },
      title: {
        display: false,
        text: `${props.name}`,
        font: {
          size: 14,
          family: 'Vazir FD',
          weight: 'bold'
        },
        padding: 16,
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

//const isDarkMode = localStorage.getItem('darkMode')
if ($q.dark.mode) {
  chartOptions.value.scales.x.ticks.color = 'white';
  chartOptions.value.scales.y.ticks.color = 'white';
  chartOptions.value.plugins.legend.title.color = 'white';
  chartOptions.value.plugins.legend.labels.color = 'white';
  chartOptions.value.scales.x.grid.color = 'rgba(255,255,255,0.2)';
  chartOptions.value.scales.y.grid.color = 'rgba(255,255,255,0.2)';

} else {
  chartOptions.value.scales.x.ticks.color = 'black';
  chartOptions.value.scales.y.ticks.color = 'black';
  chartOptions.value.plugins.legend.title.color = 'white';
  chartOptions.value.plugins.legend.labels.color = 'black';
  chartOptions.value.plugins.tooltip.backgroundColor = '#2d2d2d';
  chartOptions.value.plugins.tooltip.titleColor = 'white';
  chartOptions.value.plugins.tooltip.bodyColor = 'white';
}

</script>
