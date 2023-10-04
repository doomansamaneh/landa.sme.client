<template>
  <q-page-sticky
    class="z-1 bg-main q-px-xl q-py-md"
    position="top"
    expand
  >
    <q-toolbar class="q-mx-sm">
      <div class="row items-center q-gutter-x-sm">
        <span class="text-h6">داشبورد</span>
        <q-btn
          @click="widgetsLayout"
          size="13px"
          unelevated
          round
          dense
        ><q-icon
            name="o_widgets"
            :color="activeColor"
          /></q-btn>
        <q-btn
          v-if="toggleWidgetsLayout"
          unelevated
          rounded
          dense
          padding="6px 12px"
        >
          <q-icon
            name="o_restart_alt"
            class="q-pr-xs"
            size="20px"
          />
          <span>حالت اولیه</span>
        </q-btn>
      </div>
      <div class="q-space" />
    </q-toolbar>
  </q-page-sticky>
  <div class="q-mt-md">
    <invoices-widget />
  </div>
  <q-card class="bordered">
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
        icon="o_shopping_basket"
      />
      <q-tab
        name="financial-ratio"
        label="نسبتهای مالی"
        icon="o_trending_up"
      />
      <q-tab
        name="sales"
        label="فروش"
        icon="o_sell"
      />
      <q-tab
        name="cost"
        label="هزینه"
        icon="o_paid"
      />
      <div
        class="flex justify-end q-px-md full-width"
        v-if="tab == 'sales-income-cost'"
      >
        <q-btn
          @click="chartToTabel"
          outline
          dense
          class="q-px-sm"
        > <q-icon
            :name="icon"
            size="18px"
            color="white"
          />
          <span class="q-pl-xs text-caption">{{ label }}</span></q-btn>
      </div>
      <div
        class="flex justify-end q-px-md full-width"
        v-if="tab == 'sales'"
      >
        <q-btn
          outline
          dense
          class="q-px-sm"
        > <q-icon
            name="o_pie_chart"
            size="18px"
            color="white"
          />
          <span class="q-pl-xs text-caption">گزارش مرور فروش</span></q-btn>
      </div>
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
    >
      <q-tab-panel name="sales-income-cost">
        <div class="q-pa-md">
          <line-chart v-if="!toggleChartToTable" />
          <markup-table v-if="toggleChartToTable" />
        </div>
      </q-tab-panel>

      <q-tab-panel name="financial-ratio">
        <div class="q-pa-md">
          <financial-ratio-widget />
        </div>
      </q-tab-panel>

      <q-tab-panel name="sales">
        <div class="q-pa-md">
          <bar-chart />
        </div>
        <q-card class="no-shadow q-pa-md">
          <div class="text-h6 q-ml-md">فروش بر اساس کالاو خدمات</div>
          <q-card-section>
            <q-markup-table>
              <div class="div-table">
                <div class="div-table-header">
                  <div class="div-table-cell">کالا/خدمات</div>
                  <div class="div-table-cell">مقدار</div>
                  <div class="div-table-cell">واحد</div>
                  <div class="div-table-cell">مبلغ واحد</div>
                  <div class="div-table-cell">مبلغ کل</div>
                </div>

                <div
                  class="div-table-row"
                  v-for="item in rows"
                  :key="item"
                >
                  <div class="div-table-cell">{{ item.item }}</div>
                  <div class="div-table-cell">{{ item.quantity }}</div>
                  <div class="div-table-cell">{{ item.unit }}</div>
                  <div class="div-table-cell">{{ item.unitPrice }}</div>
                  <div class="div-table-cell text-bold">{{ item.totalPrice }}</div>
                </div>

                <div class="div-table-row">
                  <div class="div-table-cell">
                    <div class="">درآمد خالص</div>
                  </div>
                  <div class="div-table-cell">
                    <div class="">5,010,192,500</div>
                  </div>
                </div>
              </div>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="cost">
        <bar-chart />
      </q-tab-panel>

    </q-tab-panels>
  </q-card>
  <div class="q-my-lg">
    <income-widget />
  </div>
  <div class="row q-gutter-lg">
    <div class="col">
      <doughnut-chart
        name="موجودی صندوق"
        number="8,729,810"
        label="جاری شرکا"
      />
    </div>
    <div class="col">
      <doughnut-chart
        name="موجودی بانک"
        number="1,717,500"
        label="شماره حساب بانک تجارت - حساب جاری: 5858 8311 2980 9389"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import LineChart from 'src/components/shared/Charts/LineChart.vue'
import DoughnutChart from 'src/components/shared/Charts/DoughnutChart.vue'
import PieChart from 'src/components/shared/Charts/PieChart.vue'
import InvoicesWidget from 'src/components/shared/Widgets/InvoicesWidget.vue'
import MarkupTable from 'src/components/shared/DataTables/MarkupTable.vue'
import IncomeWidget from 'src/components/shared/Widgets/_IncomeWidget.vue'
import FinancialRatioWidget from 'src/components/shared/Widgets/FinancialRatioWidget.vue'

const tab = ref('sales-income-cost')
const toggleChartToTable = ref(false)
const toggleWidgetsLayout = ref(false)
const rows = ref([
  { item: 'بلیط کنسرت همایون شجریان', quantity: 12, unit: 'عدد', unitPrice: 8_000_000, totalPrice: 96_000_000 },
  { item: 'موز', quantity: 3, unit: 'کیلوگرم', unitPrice: 550_000, totalPrice: 1_650_000 },
]);


const chartToTabel = () => {
  toggleChartToTable.value = !toggleChartToTable.value
}

const widgetsLayout = () => {
  toggleWidgetsLayout.value = !toggleWidgetsLayout.value
}

const icon = computed(() => (toggleChartToTable.value ? 'o_bar_chart' : 'o_window'));
const label = computed(() => (toggleChartToTable.value ? 'نمایش به صورت نمودار' : 'نمایش به صورت جدول'));
const activeColor = computed(() => (toggleWidgetsLayout.value ? 'primary' : ''));

</script>

<style lang="scss" scoped>
.div-table-container {
  border-radius: 4px;
  overflow: hidden;
}

.div-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.div-table-header {
  display: table-header-group;
  font-weight: bold;
}

.div-table-row {
  display: table-row;
}

.div-table-cell {
  display: table-cell;
  padding: 12px;
  text-align: left;
}

.colspan-5 {
  grid-column: span 2;
}
</style>
