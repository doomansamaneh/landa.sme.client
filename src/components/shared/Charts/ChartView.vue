<template>
  <chart  :height="height" :series="series" :options="options"></chart>
</template>

<script setup>
  import Chart from "vue3-apexcharts";

  const props = defineProps({
    series: Array,
    options: Object,
    height: String,
  });
</script>
