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
    </q-toolbar>
  </q-page-sticky>
  <div class="q-mt-md">
    <invoices-widget />
  </div>
  <div>
    <q-tabs
      v-model="tab"
      inline-label
      align="left"
      class="bg-dark"
      narrow-indicator
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab
        name="sales-income-cost"
        label="فروش و درآمد، هزینه"
        icon="o_monetization_on"
      />
      <q-tab
        name="financial ratio"
        label="نسبتهای مالی"
        icon="o_price_change"
      />
      <q-tab
        name="sales"
        label="فروش"
        icon="o_price_change"
      />
      <q-tab
        name="cost"
        label="هزینه"
        icon="o_price_change"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
    >
      <q-tab-panel name="sales-income-cost">
        <line-chart />
      </q-tab-panel>

      <q-tab-panel name="financial ratio">
        <bar-chart />
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <div class="q-gutter-y-lg">
    <div class="row q-gutter-x-lg">
      <doughnut-chart />
      <pie-chart />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import LineChart from 'src/components/shared/Charts/LineChart.vue'
import DoughnutChart from 'src/components/shared/Charts/PieChart.vue'
import PieChart from 'src/components/shared/Charts/DoughnutChart.vue'
import InvoicesWidget from 'src/components/shared/Widgets/InvoicesWidget.vue'

const tab = ref('sales-income-cost')

</script>

<style lang="scss"></style>
