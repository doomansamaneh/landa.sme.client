<template>
    <ApexCharts
    type="line"
    :height="height"
    :options="options"
    :series="series"
    class="apex-line-chart"
  ></ApexCharts>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import ApexCharts from 'vue3-apexcharts'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps(['height'])

const series = ref([
  {
    name: "دریافت",
    data: [700, 41, 35, 51, 49, 62, 69, 91, 148, 78, 42, 147]
  },
  {
    name: "پرداخت",
    data: [180, 401, 15, 501, 490, 62, 690, 910, 148, 8, 2, 190]
  },
  {
    name: "هزینه",
    data: [25, 170, 89, 53, 706, 32, 77, 94, 1291, 50, 63, 790]
  },
  {
    name: "فروش و درآمد",
    data: [140, 67, 92, 38, 55, 80, 703, 27, 460, 71, 299, 88]
  }
])

const options = ref(null)
const darkModeColors = ['var(--q-dark)', 'transparent']
const lightModeColors = ['#2d2d2d09', 'transparent']

onMounted(() => {
  setChartOptions($q.dark.isActive)
})

watch(() => $q.dark.isActive, (newValue) => {
  setChartOptions(newValue)
})

function setChartOptions(isDarkMode) {
  options.value = {

    tooltip: {
      x: {
        show: false,
      },
      // theme: isDarkMode ? 'dark' : 'light',
      style: {
        fontSize: '13px',
        fontFamily: 'Vazir FD',
      },
      marker: {
        width: 8,
        height: 8,
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? 'white' : '#2d2d2d',
        },
      },
    },
    chart: {
      fontFamily: 'Vazir FD',
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 450
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3.5,
      curve: 'smooth'
    },
    grid: {
      borderColor: isDarkMode ? '#ffffff47' : '#2d2d2d2d',
      row: {
        colors: isDarkMode ? darkModeColors : lightModeColors,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 32
      },
    },
    xaxis: {
      categories: [
        'فروردین', 'اردیبهشت', 'خرداد',
        'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر',
        'دی', 'بهمن', 'اسفند'
      ],
      labels: {
        style: {
          colors: isDarkMode ? 'white' : '#2d2d2d',
        },
      },
    },
    legend: {
      show: true,
      labels: {
        colors: isDarkMode ? 'white' : '#2d2d2d',
      },
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      horizontalAlign: 'center',
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 400,
      offsetY: 16,
      markers: {
        width: 8,
        height: 8,
        radius: 50,
        offsetX: 8,
      },
      itemMargin: {
        vertical: 16,
        horizontal: 16,
      },
    },
  }
}
</script>
