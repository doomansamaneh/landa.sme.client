<template>
  <chart
    :height="height"
    :series="series"
    :options="options"
    :class="direction"
  ></chart>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Chart from 'vue3-apexcharts'

const props = defineProps({
  series: Array,
  options: Object,
  height: String
})

</script>

