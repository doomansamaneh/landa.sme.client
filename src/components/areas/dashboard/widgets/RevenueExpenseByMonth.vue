<template>
  <q-card class="shadow main-card fit bordered q-pa-none" flat>
    <q-card-section class="col q-pt-lg q-pb-none q-px-lg">
      <div class="row q-gutter-md justify-between">
        <div class="col-9">
          <q-item class="no-padding">
            <q-item-section avatar>
              <q-avatar
                v-if="saleIncome"
                rounded
                text-color="white"
                icon="o_shopping_basket"
                size="md"
                class="primary-gradient primary-shadow"
              />

              <q-avatar
                v-if="saleIncomeTable"
                rounded
                text-color="white"
                icon="o_table_chart"
                size="md"
                class="primary-gradient primary-shadow"
              />

              <q-avatar
                v-if="
                  salePerProduct ||
                  salePerProductGroup ||
                  salePerCustomer
                "
                rounded
                text-color="white"
                icon="o_sell"
                size="md"
                class="green-gradient green-shadow"
              />

              <q-avatar
                v-if="cost || costDetail"
                rounded
                text-color="white"
                icon="o_paid"
                size="md"
                class="orange-gradient orange-shadow"
              />
            </q-item-section>

            <q-item-section class="q-pl-xs">
              <q-item-label
                v-if="saleIncome"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                فروش و درآمد، هزینه
              </q-item-label>
              <q-item-label
                v-if="saleIncomeTable"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                جدول فروش و درآمد، هزینه
              </q-item-label>
              <q-item-label
                v-if="salePerProduct"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                فروش بر اساس کالا و خدمات
              </q-item-label>
              <q-item-label
                v-if="salePerProductGroup"
                class="text-body1 q-mb-xs"
              >
                فروش بر اساس گروه کالا و خدمات
              </q-item-label>
              <q-item-label
                v-if="salePerCustomer"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                فروش بر اساس مشتری
              </q-item-label>
              <q-item-label
                v-if="cost"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                نمودار هزینه
              </q-item-label>
              <q-item-label
                v-if="costDetail"
                class="text-h6 text-weight-700 q-mb-xs"
              >
                ریز هزینه
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div class="col row justify-end items-center">
          <div class="row justify-end">
            <template v-if="$q.screen.gt.xs">
              <q-btn-toggle
                v-model="chartType"
                class="custom-toggle"
                no-caps
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  { label: 'چارت', value: 1 },
                  { label: 'جدول', value: 2 },
                ]"
              />
            </template>
            <template v-else>
              <q-btn
                :icon="
                  chartType === 1 ? 'o_pie_chart' : 'o_table_chart'
                "
                unelevated
                dense
                round
                @click="toggleChartType"
              />
            </template>
            <!-- <q-btn
              unelevated
              round
              dense
              :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
              size="md"
              icon="o_more_vert"
            >
              <q-menu fit class="border-radius-lg" :offset="[0, 10]">
                <q-list dense padding style="width: 300px">
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                    @click="showSaleIncome"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_sell" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">
                        فروش و درآمد، هزینه
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                    @click="showSaleIncomeTable"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon size="20px" name="o_table_chart" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">
                        جدول فروش و درآمد، هزینه
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon name="o_sell" size="20px" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body1 no-letter-spacing">
                        فروش
                      </div>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_left" />
                    </q-item-section>
                    <q-menu class="border-radius-lg">
                      <q-list>
                        <q-item
                          clickable
                          v-close-popup
                          tabindex="0"
                          @click="showSalePerProduct"
                        >
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm">
                                <q-icon
                                  name="o_inventory_2"
                                  size="20px"
                                />
                              </q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-body2 no-letter-spacing">
                              بر اساس کالا و خدمات
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          tabindex="0"
                          @click="showSalePerProductGroup"
                        >
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm">
                                <q-icon
                                  name="o_inventory_2"
                                  size="20px"
                                />
                              </q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-body2 no-letter-spacing">
                              بر اساس گروه کالا و خدمات
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          tabindex="0"
                          @click="showSalePerCustomer"
                        >
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm">
                                <q-icon name="o_person" size="20px" />
                              </q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-body2 no-letter-spacing">
                              بر اساس مشتری
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                  <q-item clickable>
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon name="o_attach_money" size="20px" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-body2 no-letter-spacing">
                        هزینه
                      </div>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_left" />
                    </q-item-section>

                    <q-menu class="border-radius-lg">
                      <q-list>
                        <q-item
                          clickable
                          v-close-popup
                          tabindex="0"
                          @click="showCost"
                        >
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm">
                                <q-icon
                                  name="o_equalizer"
                                  size="20px"
                                />
                              </q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-body2 no-letter-spacing">
                              نمودار هزینه
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          tabindex="0"
                          @click="showCostDetail"
                        >
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm">
                                <q-icon
                                  name="o_incomplete_circle"
                                  size="20px"
                                />
                              </q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-body2 no-letter-spacing">
                              ریز هزینه
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn> -->
          </div>
        </div>
      </div>
    </q-card-section>

    <revenue-expense-chart
      v-if="chartType === 1"
      :height="300"
      legend="true"
      :data-store="revenueExpenseStore"
    />

    <revenue-expense-table
      v-if="chartType === 2"
      :data-store="revenueExpenseStore"
    />

    <bar-chart v-if="sale" :height="300" legend="false" />

    <bar-chart
      v-if="salePerProduct"
      :height="300"
      legend="false"
      seriesName="کالا و خدمات"
    />

    <pie-chart
      v-if="salePerProductGroup"
      :height="300"
      legend="false"
    />

    <bar-chart
      v-if="salePerCustomer"
      :height="300"
      legend="false"
      seriesName="مشتری"
    />

    <bar-chart
      v-if="cost"
      :height="300"
      legend="false"
      seriesName="هزینه"
    />

    <pie-chart v-if="costDetail" :height="300" legend="false" />
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useRevenueExpenseState } from "../_composables/useRevenueExpenseState";

  import BarChart from "src/components/shared/charts/BarChart.vue";
  import PieChart from "src/components/shared/charts/PieChart.vue";
  import RevenueExpenseChart from "./_RevenueExpenseChart.vue";
  import RevenueExpenseTable from "./_RevenueExpenseTable.vue";

  const revenueExpenseStore = useRevenueExpenseState();

  const chartType = ref(1);
  const saleIncome = ref(true);
  const saleIncomeTable = ref(false);
  const salePerProduct = ref(false);
  const salePerCustomer = ref(false);
  const salePerProductGroup = ref(false);
  const cost = ref(false);
  const costDetail = ref(false);

  const showSaleIncome = () => {
    saleIncome.value = true;
    saleIncomeTable.value = false;
    salePerProductGroup.value = false;
    salePerProduct.value = false;
    cost.value = false;
    costDetail.value = false;
  };

  const showSaleIncomeTable = () => {
    saleIncomeTable.value = true;
    saleIncome.value = false;
    salePerProductGroup.value = false;
    salePerProduct.value = false;
    cost.value = false;
    costDetail.value = false;
  };

  const showSalePerProduct = () => {
    saleIncome.value = false;
    saleIncomeTable.value = false;
    salePerCustomer.value = false;
    salePerProduct.value = true;
    salePerProductGroup.value = false;
    cost.value = false;
    costDetail.value = false;
  };

  const showSalePerProductGroup = () => {
    saleIncome.value = false;
    saleIncomeTable.value = false;
    salePerCustomer.value = false;
    salePerProduct.value = false;
    cost.value = false;
    costDetail.value = false;
    salePerProductGroup.value = true;
  };

  const showSalePerCustomer = () => {
    saleIncome.value = false;
    saleIncomeTable.value = false;
    salePerProduct.value = false;
    salePerProductGroup.value = false;
    salePerCustomer.value = true;
    cost.value = false;
    costDetail.value = false;
  };

  const showCost = () => {
    saleIncome.value = false;
    saleIncomeTable.value = false;
    salePerProduct.value = false;
    salePerProductGroup.value = false;
    salePerCustomer.value = false;
    costDetail.value = false;
    cost.value = true;
  };

  const showCostDetail = () => {
    saleIncome.value = false;
    saleIncomeTable.value = false;
    salePerProduct.value = false;
    salePerProductGroup.value = false;
    salePerCustomer.value = false;
    cost.value = false;
    costDetail.value = true;
  };

  const toggleChartType = () => {
    chartType.value = chartType.value === 1 ? 2 : 1;
  };
</script>

<style lang="scss" scoped>
  .custom-toggle {
    border: 1px solid var(--q-primary);
  }

  .main-card {
    min-height: 350px;
  }
</style>
