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
      class="bg-primary text-white"
      narrow-indicator
      active-color="white"
      indicator-color="white"
      stretch
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
      <div class="flex justify-end q-px-md full-width" v-if="tab == 'sales-income-cost'">
        <q-btn
            @click="chartToTabel"
            unelevated
            dense
            class="q-px-sm bordered-btn"
          > <q-icon
              :name="icon"
              size="18px"
              color="white"
            />
            <span class="q-pl-xs text-caption">{{ label }}</span></q-btn>
      </div>
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
    >
      <q-tab-panel name="sales-income-cost">
        <!-- <div class="q-mb-md row justify-end">
          <q-btn
            @click="chartToTabel"
            unelevated
            dense
            class="q-px-sm bordered-btn"
          > <q-icon
              :name="icon"
              size="18px"
              color="primary"
            />
            <span class="q-pl-xs text-caption">{{ label }}</span></q-btn>
        </div> -->
        <div>
          <line-chart v-if="!toggleChartToTable" />
          <markup-table v-if="toggleChartToTable" />
        </div>
      </q-tab-panel>

      <q-tab-panel name="financial ratio">
        <bar-chart />
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <!-- <div class="row q-gutter-x-lg">
      <doughnut-chart />
      <pie-chart />
    </div> -->
  <div class="row q-my-lg  q-gutter-x-lg justify-between">
    <div class="col-5">
      <income-widget />
    </div>
    <div class="col">
      <pie-chart />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import LineChart from 'src/components/shared/Charts/LineChart.vue'
import DoughnutChart from 'src/components/shared/Charts/PieChart.vue'
import PieChart from 'src/components/shared/Charts/DoughnutChart.vue'
import InvoicesWidget from 'src/components/shared/Widgets/InvoicesWidget.vue'
import MarkupTable from 'src/components/shared/DataTables/MarkupTable.vue'
import IncomeWidget from 'src/components/shared/Widgets/IncomeWidget.vue'

const tab = ref('sales-income-cost')
const toggleChartToTable = ref(false)

const chartToTabel = () => {
  toggleChartToTable.value = !toggleChartToTable.value
}

const icon = computed(() => (toggleChartToTable.value ? 'o_bar_chart' : 'o_window'));
const label = computed(() => (toggleChartToTable.value ? 'نمایش به صورت نمودار' : 'نمایش به صورت جدول'));


</script>

<style lang="scss"></style>
