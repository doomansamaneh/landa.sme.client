<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="q-mx-sm">
      <div class="row items-center">
        <span class="text-h6">داشبورد</span>
      </div>
      <div class="q-space" />
      <q-btn
        class="bordered-btn bg-dark"
        padding="6px 16px"
        unelevated
        @click="exportTable"
      ><q-icon
          name="o_calendar_today"
          class="q-pr-sm"
          size="16px"
        />سال مالی: 1402</q-btn>
    </q-toolbar>
  </q-page-sticky>

  <div class="q-gutter-y-lg q-mt-xs">
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

<style lang="scss"></style>
