<template>
  <ApexCharts
    type="line"
    :height="height"
    :options="options"
    :series="series"
  ></ApexCharts>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApexCharts from 'vue3-apexcharts';

const props = defineProps(['height']);

const series = ref([
  {
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }
]);

const options = ref(null);

onMounted(() => {
  options.value = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  }
});
</script>

