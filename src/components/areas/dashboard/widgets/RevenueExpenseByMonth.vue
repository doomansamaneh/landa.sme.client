<template>
  <q-card
    v-access="`acc.report.accountReview`"
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow main-card fit bordered q-pa-none"
    flat
  >
    <template v-if="isShakingComputed">
      <q-btn
        no-caps
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
      <q-card-section class="col">
        <div class="row q-gutter-md justify-between">
          <div class="col-9">
            <widget-title
              :label="$t('shared.labels.revenueExpenseByMonth')"
              icon="o_shopping_basket"
            />
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
                    { label: $t('shared.labels.chart'), value: 1 },
                    { label: $t('shared.labels.table'), value: 2 },
                  ]"
                />
              </template>
              <template v-else>
                <q-btn
                  no-caps
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
  import { useRevenueExpenseState } from "../_composables/generalTab/useRevenueExpenseState";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/generalTab/useGeneralTab";

  import RevenueExpenseChart from "./_RevenueExpenseChart.vue";
  import RevenueExpenseTable from "./_RevenueExpenseTable.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const revenueExpenseStore = useRevenueExpenseState();
  const draggable = useGeneralTab();

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const chartType = ref(1);
  const toggleChartType = () => {
    chartType.value = chartType.value === 1 ? 2 : 1;
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>

<style lang="scss" scoped>
  .custom-toggle {
    border: 1px solid var(--q-primary);
  }

  .main-card {
    min-height: 350px;
  }
</style>
