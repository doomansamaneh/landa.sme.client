<template>
  <q-card class="fit bordered q-pa-none" flat>
    <q-card-section class="col q-pt-lg q-pb-none q-pl-lg q-pr-md">
      <div class="row justify-between">
        <div class="col-11">
          <q-item class="no-padding">
            <q-item-section avatar>
              <q-avatar v-if="saleIncome" rounded color="blue" text-color="white" icon="o_shopping_basket" size="md"
                class="blue-shadow" />

              <q-avatar v-if="saleIncomeTable" rounded color="blue" text-color="white" icon="o_table_chart" size="md"
                class="blue-shadow" />

              <q-avatar v-if="salePerProduct || salePerProductGroup || salePerCustomer" rounded color="green"
                text-color="white" icon="o_sell" size="md" class="green-shadow" />

              <q-avatar v-if="cost || costDetail" rounded color="red" text-color="white" icon="o_paid" size="md"
                class="orange-shadow" />
            </q-item-section>

            <q-item-section class="q-pl-xs">
              <q-item-label v-if="saleIncome" class="text-h6 text-weight-700 q-mb-xs">
                فروش و درآمد، هزینه
              </q-item-label>
              <q-item-label v-if="saleIncomeTable" class="text-h6 text-weight-700 q-mb-xs">
                جدول فروش و درآمد، هزینه
              </q-item-label>
              <q-item-label v-if="salePerProduct" class="text-h6 text-weight-700 q-mb-xs">
                فروش بر اساس کالا و خدمات
              </q-item-label>
              <q-item-label v-if="salePerProductGroup" class="text-body1 q-mb-xs">فروش بر اساس گروه کالا و
                خدمات</q-item-label>
              <q-item-label v-if="salePerCustomer" class="text-h6 text-weight-700 q-mb-xs">فروش بر اساس
                مشتری</q-item-label>
              <q-item-label v-if="cost" class="text-h6 text-weight-700 q-mb-xs">نمودار هزینه</q-item-label>
              <q-item-label v-if="costDetail" class="text-h6 text-weight-700 q-mb-xs">ریز هزینه</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div class="col">
          <div class="row justify-end">
            <q-btn unelevated round dense :text-color="$q.dark.isActive ? 'white' : 'grey-8'" size="md"
              icon="o_more_vert">
              <q-menu fit class="border-radius-lg">
                <q-list dense padding style="width: 240px">
                  <q-item clickable v-close-popup tabindex="0" @click="showSaleIncome">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon name="o_sell" size="14px" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">فروش و درآمد، هزینه</div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup tabindex="0" @click="showSaleIncomeTable">
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm">
                          <q-icon name="o_table_50650000," size="14px" />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">جدول فروش و درآمد، هزینه</div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_close" size="14px" /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">فروش</div>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_left" />
                    </q-item-section>
                    <q-menu class="border-radius-lg">
                      <q-list>
                        <q-item clickable v-close-popup tabindex="0" @click="showSalePerProduct">
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_inventory_2"
                                  size="14px" /></q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-caption">بر اساس کالا و خدمات</div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup tabindex="0" @click="showSalePerProductGroup">
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_inventory_2"
                                  size="14px" /></q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-caption">
                              بر اساس گروه کالا و خدمات
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup tabindex="0" @click="showSalePerCustomer">
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_person" size="14px" /></q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-caption">بر اساس مشتری</div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                  <q-item clickable>
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_attach_money" size="14px" /></q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">هزینه</div>
                    </q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_left" />
                    </q-item-section>

                    <q-menu class="border-radius-lg">
                      <q-list>
                        <q-item clickable v-close-popup tabindex="0" @click="showCost">
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_equalizer"
                                  size="14px" /></q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-caption">نمودار هزینه</div>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup tabindex="0" @click="showCostDetail">
                          <div class="row items-center">
                            <q-item-section avatar>
                              <q-avatar class="bg-on-dark" size="sm"><q-icon name="o_incomplete_circle"
                                  size="14px" /></q-avatar>
                            </q-item-section>
                          </div>
                          <q-item-section>
                            <div class="text-caption">ریز هزینه</div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>

    <revenue-expense-chart v-if="saleIncome" :height="300" legend="true" />
    <revenue-expense-table v-if="saleIncomeTable" />

    <bar-chart v-if="sale" :height="300" legend="false" />

    <bar-chart v-if="salePerProduct" :height="300" legend="false" seriesName="کالا و خدمات" />

    <pie-chart v-if="salePerProductGroup" :height="300" legend="false" />

    <bar-chart v-if="salePerCustomer" :height="300" legend="false" seriesName="مشتری" />

    <bar-chart v-if="cost" :height="300" legend="false" seriesName="هزینه" />

    <pie-chart v-if="costDetail" :height="300" legend="false" />
  </q-card>
</template>

<script setup>
import { ref } from "vue";

import BarChart from "src/components/shared/charts/BarChart.vue";
import PieChart from "src/components/shared/charts/PieChart.vue";
import DonutChart from "src/components/shared/charts/DonutChart.vue";
import RevenueExpenseChart from "./_RevenueExpenseChart.vue";
import RevenueExpenseTable from "./_RevenueExpenseTable.vue";

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
</script>
