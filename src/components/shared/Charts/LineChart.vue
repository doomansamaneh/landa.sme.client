<template>
  <Line
    class="line-chart"
    :options="chartOptions"
    :data="chartData"
    :style="myStyles"
  />
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from "vue"
import { Line } from "vue-chartjs"
import { useQuasar } from "quasar"

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const $q = useQuasar()

const height = ref(400)

const myStyles = {
  height: `${height.value}px`,
  position: 'relative',
}

const chartData = ref({
  labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  datasets: [{
    label: 'دریافت',
    data: [1000000000, 500000, 30000000, 2000000000, 80000000000, 4000000000, 0, 0, 0, 0, 0, 5000000000],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    tension: 0.5,
    pointStyle: 'circle',
    pointHoverRadius: 10
  },
  {
    label: 'پرداخت',
    data: [432000000, 1000000000, 500000, 30000000, 2000000000, 7000000000, 8000000000, 50000000, 0, 0, 0, 0, 0, 500000000],
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    borderColor: 'rgb(255, 159, 64)',
    tension: 0.5,
    pointStyle: 'circle',
    pointHoverRadius: 10
  },
  {
    label: 'هزینه',
    data: [1000000000, 8000000000, 0, 0, 0, 0, 12000000, 0, 0, 0, 0, 0],
    backgroundColor: 'rgba(255, 205, 86, 0.2)',
    borderColor: 'rgb(255, 205, 86)',
    tension: 0.5,
    pointStyle: 'circle',
    pointHoverRadius: 10
  },
  {
    label: 'فروش و درآمد',
    data: [2000000000],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.5,
    pointStyle: 'circle',
    pointHoverRadius: 10
  }],

});

const updateChartStyles = () => {

  if ($q.dark.isActive) {
    alert($q.dark.isActive)
    chartOptions.value.scales.x.ticks.color = 'white';
    chartOptions.value.scales.y.ticks.color = 'white';
    chartOptions.value.plugins.legend.labels.color = 'white';
    chartOptions.value.scales.x.grid.color = 'rgba(255,255,255,0.2)';
    chartOptions.value.scales.y.grid.color = 'rgba(255,255,255,0.2)';

  } else {
    chartOptions.value.scales.x.ticks.color = 'black';
    chartOptions.value.scales.y.ticks.color = 'black';
    chartOptions.value.plugins.legend.labels.color = 'black';
    chartOptions.value.plugins.tooltip.backgroundColor = '#2d2d2d';
    chartOptions.value.plugins.tooltip.titleColor = 'white';
    chartOptions.value.plugins.tooltip.bodyColor = 'white';
  }

  // ChartJS.update();
}

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {

          font: {
            family: 'Vazir FD',
            size: 12,
          },
          color: `${color.value}`
        },
        grid: {
          color: `${gridColor.value}`
        }
      },
      y: {
        ticks: {

          font: {
            family: 'Vazir FD',
            size: 12,
          },
          color: `${color.value}`
        },
        grid: {
          color: `${gridColor.value}`

        }
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
          color: `${color.value}`,
          padding: 32,
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
  }

})

const color = computed(() =>
  $q.dark.isActive ? 'white' : 'black'
)

const gridColor = computed(() =>
  $q.dark.isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
)
</script>
