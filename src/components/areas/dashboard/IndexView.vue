<template>
  <q-page-sticky
    class="z-1 bg-main q-py-md"
    style="margin: 0 38px"
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
        >
          <q-icon name="o_widgets" :color="activeColor" />
        </q-btn>
        <q-btn
          v-if="togglewidgetsLayout"
          unelevated
          rounded
          dense
          padding="6px 12px"
        >
          <q-icon name="o_restart_alt" class="q-pr-xs" size="20px" />
          <span>حالت اولیه</span>
        </q-btn>
      </div>
      <div class="q-space" />
    </q-toolbar>
  </q-page-sticky>

  <div style="margin-top: 42px">
    <div class="row">
      <div class="col-8 col-md-8 col-sm-12">
        <invoices-widget-v2 />
      </div>
      <div class="col col-md col-sm-12">
        <sales-widget />
      </div>
    </div>
  </div>

  <div class="row q-my-lg">
    <div class="col col-md-4 col-sm-12 container">
      <ratios-widget />
    </div>

    <div class="col-12 col-md-8 col-sm-12">
      <q-card class="bordered q-pa-none" flat>
        <q-card-section class="col q-pt-lg q-pb-none q-pl-lg q-pr-md">
          <div class="row justify-between">
            <div class="col-11">
              <q-item class="no-padding">
                <q-item-section avatar>
                  <q-avatar
                    v-if="saleIncome"
                    rounded
                    color="blue"
                    text-color="white"
                    icon="o_shopping_basket"
                    size="md"
                    class="primary-shadow"
                  />

                  <q-avatar
                    v-if="sale"
                    rounded
                    color="green"
                    text-color="white"
                    icon="o_sell"
                    size="md"
                    class="green-shadow"
                  />

                  <q-avatar
                    v-if="cost"
                    rounded
                    color="red"
                    text-color="white"
                    icon="o_paid"
                    size="md"
                    class="orange-shadow"
                  />
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    v-if="saleIncome"
                    class="text-body2 q-mb-xs"
                  >
                    فروش و درآمد، هزینه
                  </q-item-label>
                  <q-item-label
                    v-if="sale"
                    class="text-body2 q-mb-xs"
                  >
                    فروش
                  </q-item-label>
                  <q-item-label
                    v-if="cost"
                    class="text-body2 q-mb-xs"
                  >
                    هزینه
                  </q-item-label>
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
                  <q-menu class="border-radius-lg" fit>
                    <q-list dense padding style="width: 200px">
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="showSaleIncome"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_sell" size="14px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">
                            فروش و درآمد، هزینه
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        tabindex="0"
                        @click="showSale"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_close" size="14px" />
                            </q-avatar>
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
                        @click="showCost"
                      >
                        <div class="q-py-sm">
                          <q-item-section avatar>
                            <q-avatar class="bg-on-dark" size="sm">
                              <q-icon name="o_check" size="14px" />
                            </q-avatar>
                          </q-item-section>
                        </div>
                        <q-item-section>
                          <div class="text-caption">هزینه</div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>

        <line-chart v-if="saleIncome" :height="300" legend="true" />

        <bar-chart v-if="sale" :height="300" legend="false" />

        <bar-chart v-if="cost" :height="300" legend="false" />
      </q-card>
    </div>
  </div>

  <div class="row q-my-lg q-gutter-x-lg">
    <div class="col">
      <income-widget />
    </div>

    <div class="col-6">
      <q-card class="no-shadow bordered">
        <q-card-section class="q-pa-lg">
          <div class="text-body1">موجودی بانک</div>
          <donut-chart :height="350" width="100%" :legend="true" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useQuasar } from "quasar";

  import LineChart from "src/components/shared/charts/LineChart.vue";
  import BarChart from "src/components/shared/charts/BarChart.vue";
  import PieChart from "src/components/shared/charts/PieChart.vue";
  import DonutChart from "src/components/shared/charts/DonutChart.vue";
  import InfoCarousel from "src/components/areas/dashboard/widgets/InfoCarousel.vue";
  import InvoicesWidgetV2 from "src/components/areas/dashboard/widgets/InvoiceSummary.vue";
  import SalesWidget from "src/components/areas/dashboard/widgets/SalesWidget.vue";
  import RatiosWidget from "src/components/areas/dashboard/widgets/RatiosWidget.vue";
  import MarkupTable from "src/components/shared/DataTables/MarkupTable.vue";
  import IncomeWidget from "src/components/areas/dashboard/widgets/_IncomeWidget.vue";
  import FinancialRatioWidget from "src/components/areas/dashboard/widgets/FinancialRatioWidget.vue";

  const $q = useQuasar();

  const tab = ref("sales-income-cost");
  const toggleChartToTable = ref(false);
  const togglewidgetsLayout = ref(false);
  const productServiceGroup = ref(false);
  const customer = ref(false);
  const productService = ref(true);

  const chartToTabel = () => {
    toggleChartToTable.value = !toggleChartToTable.value;
  };
  const activeButton = ref(false);

  const widgetsLayout = () => {
    togglewidgetsLayout.value = !togglewidgetsLayout.value;
    activeButton.value = !activeButton.value;
  };

  const customerReport = () => {
    productService.value = false;
    productServiceGroup.value = false;
    customer.value = true;
  };

  const productServiceGroupChart = () => {
    productService.value = false;
    customer.value = false;
    productServiceGroup.value = true;
  };

  const productServiceChart = () => {
    productService.value = true;
    customer.value = false;
    productServiceGroup.value = false;
  };

  const goToSaleReview = () => {
    alert("گزارش مرور فروش");
  };

  const icon = computed(() =>
    toggleChartToTable.value ? "o_bar_chart" : "o_window"
  );
  const label = computed(() =>
    toggleChartToTable.value
      ? "نمایش به صورت نمودار"
      : "نمایش به صورت جدول"
  );
  const activeColor = computed(() =>
    togglewidgetsLayout.value ? "primary" : ""
  );

  const saleIncome = ref(true);
  const sale = ref(false);
  const cost = ref(false);

  const showSaleIncome = () => {
    saleIncome.value = true;
    sale.value = false;
    cost.value = false;
  };

  const showSale = () => {
    saleIncome.value = false;
    cost.value = false;
    sale.value = true;
  };

  const showCost = () => {
    saleIncome.value = false;
    sale.value = false;
    cost.value = true;
  };
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
