<template>
  <q-card class="shadow main-card fit bordered q-pa-none" flat>
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
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 text-weight-700">
                فروش و درآمد، هزینه
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
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useRevenueExpenseState } from "../_composables/useRevenueExpenseState";

  import RevenueExpenseChart from "./_RevenueExpenseChart.vue";
  import RevenueExpenseTable from "./_RevenueExpenseTable.vue";

  const revenueExpenseStore = useRevenueExpenseState();

  const chartType = ref(1);
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
