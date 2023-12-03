<template>
  <ApexCharts
    type="bar"
    :options="options"
    :series="series"
    :height="height"
  ></ApexCharts>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApexCharts from 'vue3-apexcharts';

const props = defineProps(['height']);

const series = ref([
  {
    name: 'هزینه',
    data: [20000000, 40000000, 60000000, 8000000, 10000000, 12000000, 14000000]
  }
]);

const options = ref(null);

onMounted(() => {
  options.value = {
    chart: {
      type: 'bar',
      fontFamily: 'Vazir FD',
      width: '100%',
      height: '400px',
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
    plotOptions: {
      bar: {
        columnWidth: '24px',
        barHeight: '100%',
        borderRadius: 4,
        distributed: true,
        horizontal: false,
        dataLabels: {
          position: 'bottom'
        },
      },
    },
    fill: {
      colors: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
      ]
    },
    dataLabels: {
      enabled: false,
      textAnchor: 'start',
      style: {
        colors: ['#2d2d2d']
      },
      offsetX: 0,
      offsetY: 0,
      dropShadow: {
        enabled: false
      }
    },
    stroke: {
      colors: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
      ]
    },
    xaxis: {
      categories: ['موز', 'اشتراک لاندا نسخه حرفه ای', 'تجهیزات شبکه', 'طراحی لوگو', 'ادکلن مردانه', 'کفی ساینا', 'تلفن ماهواره ای'],
    },
    yaxis: {
      labels: {
        show: true
      }
    },
    legend: {
      show: false,
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
        colors: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
      },
      itemMargin: {
        vertical: 16,
        horizontal: 16,
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      },
    },
  };
});
</script>

<style></style>
