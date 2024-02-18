<script setup>
import { ref } from 'vue';
import ApexChart from 'vue3-apexcharts';

const chartOptions = {
  chart: {
    id: 'vuechart-example',
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
};

const series = ref([
  {
    name: 'Vue Chart',
    data: [300, 40, 45, 50, 49, 60, 70, 81],
  },
]);

const updateChart = () => {
  const max = 90;
  const min = 20;
  const newData = series.value[0].data.map(() => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  // Update the series option
  series.value[0].data = newData;
};
</script>

<template>
  <div class="text-h1 text-center">quasar with vite
    <apex-chart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
    <q-btn color="red" @click="updateChart" label="Update Chart"></q-btn>
  </div>
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
