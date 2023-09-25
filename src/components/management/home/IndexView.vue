<template>
  <div class="q-gutter-y-lg">
    <bar-chart />
    <line-chart />
    <div class="row q-gutter-x-lg">
      <doughnut-chart />
      <pie-chart />
    </div>
  </div>
</template>

<script setup>
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import LineChart from 'src/components/shared/Charts/LineChart.vue'
import DoughnutChart from 'src/components/shared/Charts/PieChart.vue'
import PieChart from 'src/components/shared/Charts/DoughnutChart.vue'
</script>
