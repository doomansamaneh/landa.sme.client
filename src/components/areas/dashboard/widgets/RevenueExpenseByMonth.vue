<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow main-card fit bordered q-pa-none"
    flat
  >
    <template v-if="isShakingComputed">
      <q-btn
        class="off-btn bordered absolute-top-right q-ma-sm z-1"
        round
        dense
        unelevated
        @click="hideWidget"
      >
        <q-icon name="o_visibility_off" />
      </q-btn>
    </template>

    <div
      :class="
        isShakingComputed ? 'no-pointer-events' : 'pointer-events-all'
      "
    >
      <q-card-section class="col q-pt-lg q-pb-none q-px-lg">
        <div class="row q-gutter-md justify-between">
          <div class="col-9">
            <q-item class="no-padding">
              <q-item-section avatar>
                <q-avatar
                  rounded
                  text-color="white"
                  icon="o_shopping_basket"
                  size="md"
                  class="primary-gradient primary-shadow"
                />

                <!-- <q-avatar
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
                /> -->
              </q-item-section>

              <q-item-section>
                <q-item-label
                  class="text-h6 text-weight-700"
                >
                  فروش و درآمد، هزینه
                </q-item-label>
                <!-- <q-item-label
                  v-if="saleIncomeTable"
                  class="text-h6 text-weight-700"
                >
                  جدول فروش و درآمد، هزینه
                </q-item-label>
                <q-item-label
                  v-if="salePerProduct"
                  class="text-h6 text-weight-700"
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
                  class="text-h6 text-weight-700"
                >
                  فروش بر اساس مشتری
                </q-item-label>
                <q-item-label
                  v-if="cost"
                  class="text-h6 text-weight-700"
                >
                  نمودار هزینه
                </q-item-label>
                <q-item-label
                  v-if="costDetail"
                  class="text-h6 text-weight-700"
                >
                  ریز هزینه
                </q-item-label> -->
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
                  :color="$q.dark.isActive ? 'dark' : 'white'"
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
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRevenueExpenseState } from "../_composables/useRevenueExpenseState";
  import { useDraggableWidgets } from "src/composables/useDraggableWidgets";

  import RevenueExpenseChart from "./_RevenueExpenseChart.vue";
  import RevenueExpenseTable from "./_RevenueExpenseTable.vue";

  const revenueExpenseStore = useRevenueExpenseState();
  const draggable = useDraggableWidgets();

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const chartType = ref(1);
  const toggleChartType = () => {
    chartType.value = chartType.value === 1 ? 2 : 1;
  };

  const isShakingComputed = computed(() => draggable.isShaking.value);
</script>

<style lang="scss" scoped>
  .custom-toggle {
    border: 1px solid var(--q-primary);
  }

  .main-card {
    min-height: 350px;
  }
</style>
