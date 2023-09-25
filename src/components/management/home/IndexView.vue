<template>
  <div class="q-gutter-y-lg">
    <invoices-widget />
  </div>
  <div class="q-gutter-y-lg">
    <line-chart />
    <bar-chart />
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
import InvoicesWidget from 'src/components/shared/Widgets/InvoicesWidget.vue'
</script>

<style lang="scss">
.bordered-btn {
  border: 1px solid #d9dce5;
  box-shadow: 0 0 2px 0 #dedede;
}

.actions {
  max-width: calc(100% - 68px);
}
</style>
