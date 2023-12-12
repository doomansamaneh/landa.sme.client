<template>
  <q-page-sticky
    class="z-1 bg-main q-py-md"
    style="margin: 0 38px;"
    position="top"
    expand
  >
    <q-toolbar>
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
  <div style="margin-top: 42px;">
    <!-- <invoices-widget /> -->
    <div class="row q-gutter-x-lg">
      <div class="col-8 col-md-8 col-sm-12">
        <!-- <create-new-invoice /> -->
        <!-- <info-carousel /> -->
        <invoices-widget-v2 />

      </div>
      <div class="col col-md col-sm-12">
        <sales-widget />
      </div>
    </div>
  </div>

  <div class="row q-my-lg">

    <div class="col-4"></div>

    <div class="col-8">
      <q-card
        class="bordered q-pa-none"
        flat
      >
        <q-card-section class="col q-py-lg q-pl-lg q-pr-md">

          <div class="row justify-between">
            <div class="col-11">
              <q-item class="no-padding">
                <q-item-section avatar>
                  <q-avatar
                    rounded
                    color="green"
                    text-color="white"
                    icon="o_sell"
                    size="md"
                    class="green-shadow"
                  />
                </q-item-section>

                <q-item-section class="q-pl-xs">
                  <q-item-label class="text-body2 q-mb-xs">فروش و درآمد، هزینه</q-item-label>
                </q-item-section>
              </q-item>

            </div>
            <div class="col">

              <div class="row justify-end">
                <q-btn
                  unelevated
                  round
                  dense
                  :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                  size="md"
                  icon="o_more_vert"
                >

                  <q-menu fit>
                    <q-list
                      dense
                      padding
                      style="width:200px"
                    >
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="showLineChart"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="dark-icon"
                              size="sm"
                            ><q-icon
                                name="o_refresh"
                                size="14px"
                              /></q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">فروش و درآمد، هزینه</div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="showBarChart"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="dark-icon"
                              size="sm"
                            ><q-icon
                                name="o_close"
                                size="14px"
                              /></q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">فروش</div>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="dark-icon"
                              size="sm"
                            ><q-icon
                                name="o_check"
                                size="14px"
                              /></q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">درآمد</div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar
                              class="dark-icon"
                              size="sm"
                            ><q-icon
                                name="o_download"
                                size="16px"
                              /></q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">تبدیل به اکسل</div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>

                </q-btn>
              </div>

            </div>
          </div>
        </q-card-section>

        <line-chart
          v-if="lineChart"
          :height="350"
          legend="true"
        />

        <bar-chart
          v-if="barChart"
          :height="350"
          legend="true"
        />

      </q-card>
    </div>

  </div>

  <!-- <q-card class="bordered q-mt-lg">


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
            name="o_more_horiz"
            size="18px"
            color="white"
          />
          <span class="q-pl-xs text-caption">بیشتر</span>
          <q-menu
            class="no-shadow z-max"
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list
              style="min-width: 210px;"
              dense
              padding
            >
              <q-item
                clickable
                @click="productServiceChart"
                v-close-popup
                tabindex="0"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon
                      class="dark-icon"
                      name="o_inventory_2"
                      size="xs"
                    />
                  </q-item-section>
                </div>
                <q-item-section>
                  <span class="text-caption">فروش بر اساس کالا و خدمات</span>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="customerReport"
                v-close-popup
                tabindex="0"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon
                      class="dark-icon"
                      name="o_person"
                      size="xs"
                    />
                  </q-item-section>
                </div>
                <q-item-section>
                  <span class="text-caption">فروش بر اساس مشتری</span>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="productServiceGroupChart"
                v-close-popup
                tabindex="0"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon
                      class="dark-icon"
                      name="o_incomplete_circle"
                      size="xs"
                    />
                  </q-item-section>
                </div>
                <q-item-section>
                  <span class="text-caption">مشاهده گروه کالا و خدمات</span>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                @click="goToSaleReview"
                v-close-popup
                tabindex="0"
                class="q-py-sm"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-icon
                      class="dark-icon"
                      name="o_pie_chart"
                      size="xs"
                    />
                  </q-item-section>
                </div>
                <q-item-section>
                  <span class="text-caption">گزارش مرور فروش</span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-tabs>

    <q-separator />

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
    >
      <q-tab-panel name="sales-income-cost" class="no-scroll no-padding">
          <div v-if="!toggleChartToTable">
            <line-chart
              :height="400"
              :legend="true"
              v-if="!toggleChartToTable"
            />
            <div
              class="row items-center text-caption"
              v-if="$q.lang.rtl"
            >
              <q-icon
                name="o_info"
                class="q-mr-xs"
                size="xs"
              />
              تمامی ارقامی که مشاهده می‌کنید به <span class="text-bold q-px-xs">ریال</span> می‌باشند.
            </div>
          </div>
          <markup-table v-if="toggleChartToTable" />
      </q-tab-panel>

      <q-tab-panel name="financial-ratio">
        <div class="q-pa-md">
          <financial-ratio-widget />
        </div>
      </q-tab-panel>

      <q-tab-panel name="sales">
        <div
          class="q-pa-md"
          v-if="productService"
        >
          <bar-chart name="کالا و خدمت" />
          <bar-chart
            title="فروش بر اساس کالا و خدمات"
            :height="350"
            :legend="false"
          />
        </div>
        <div
          class="q-pa-md"
          v-if="customer"
        >
          <bar-chart
            title="فروش بر اساس مشتری"
            :height="350"
            :legend="false"
          />
        </div>
        <div
          class="q-pa-md"
          v-if="productServiceGroup"
        >
          <div class="text-body1">موجودی صندوق</div>
          <pie-chart
            :height="350"
            :legend="true"
          />
        </div>
      </q-tab-panel>

      <q-tab-panel name="cost">
        <div class="q-pa-md">
          <bar-chart
            height="350"
            :legend="false"
          />
        </div>
      </q-tab-panel>

    </q-tab-panels>
  </q-card> -->
  <div class="row q-my-lg q-gutter-x-lg">

    <div class="col">
      <income-widget />
    </div>

    <div class="col-6">
      <q-card class="no-shadow bordered">
        <q-card-section class="q-pa-lg">
          <div class="text-body1">موجودی بانک</div>
          <donut-chart
            :height="350"
            width="100%"
            :legend="true"
          />
        </q-card-section>
      </q-card>
    </div>

  </div>

  <div class="row q-gutter-lg q-mb-lg">
    <div class="col-8">
      <sales-widget />
    </div>
    <div class="col">
      <q-card class="no-shadow bordered">
        <q-card-section class="q-pa-lg">
          <div class="text-body1">موجودی صندوق</div>
          <donut-chart
            :height="350"
            width="100%"
            :legend="true"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useQuasar } from "quasar"

import LineChart from 'src/components/shared/Charts/LineChart.vue'
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import PieChart from 'src/components/shared/Charts/PieChart.vue'
import DonutChart from 'src/components/shared/Charts/DonutChart.vue'
import InfoCarousel from 'src/components/shared/Widgets/InfoCarousel.vue'
import InvoicesWidgetV2 from 'src/components/shared/Widgets/InvoicesWidgetV2.vue'
import SalesWidget from 'src/components/shared/Widgets/SalesWidget.vue'
import MarkupTable from 'src/components/shared/DataTables/MarkupTable.vue'
import IncomeWidget from 'src/components/shared/Widgets/_IncomeWidget.vue'
import FinancialRatioWidget from 'src/components/shared/Widgets/FinancialRatioWidget.vue'

const $q = useQuasar()

const tab = ref('sales-income-cost')
const toggleChartToTable = ref(false)
const toggleWidgetsLayout = ref(false)
const productServiceGroup = ref(false)
const customer = ref(false)
const productService = ref(true)

const chartToTabel = () => {
  toggleChartToTable.value = !toggleChartToTable.value
}
const activeButton = ref(false)

const widgetsLayout = () => {
  toggleWidgetsLayout.value = !toggleWidgetsLayout.value
  activeButton.value = !activeButton.value
}

const customerReport = () => {
  productService.value = false
  productServiceGroup.value = false
  customer.value = true
}

const productServiceGroupChart = () => {
  productService.value = false
  customer.value = false
  productServiceGroup.value = true
}

const productServiceChart = () => {
  productService.value = true
  customer.value = false
  productServiceGroup.value = false
}

const goToSaleReview = () => {
  alert("گزارش مرور فروش")
}

const icon = computed(() => (toggleChartToTable.value ? 'o_bar_chart' : 'o_window'));
const label = computed(() => (toggleChartToTable.value ? 'نمایش به صورت نمودار' : 'نمایش به صورت جدول'));
const activeColor = computed(() => (toggleWidgetsLayout.value ? 'primary' : ''));


const barChart = ref(false)
const lineChart = ref(true)

const showBarChart = () => {
  lineChart.value = false;
  barChart.value = true;
}

const showLineChart = () => {
  barChart.value = false;
  lineChart.value = true;
}

// $q.screen.setSizes({ xs: 0, sm: 300, md: 500, lg: 1000, xl: 2000 })

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

// body.screen--lg {

//   .carousel-container {

//     display: grid;
//     grid-template-columns: repeat(2, 1fr);

//   }

// }
</style>
