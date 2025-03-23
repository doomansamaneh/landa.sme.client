<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow border-radius-lg bordered"
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
      <q-card-section class="q-pb-none">
        <widget-title label="فروش و درآمد" icon="receipt_long" />
      </q-card-section>

      <q-card-section class="row q-col-gutter-md q-pt-md q-px-lg">
        <div class="col-md-8 col-xs-12">
          <div class="text-h3 text-weight-700">
            {{
              formatRevenue(revenueExpenseStore.revenueTotal?.value)
            }}
          </div>
        </div>
        <div
          :class="$q.screen.gt.xs ? 'absolute-top-right q-mt-xl' : ''"
          :style="{ width: '250px' }"
        >
          <apex-chart
            v-if="reportStore.chartSeries?.value"
            class="pie-chart"
            type="donut"
            :options="chartOptions"
            :series="reportStore.chartSeries.value"
          />
        </div>
      </q-card-section>

      <sales-sparkline />
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  import { helper } from "src/helpers";
  import { useReport } from "src/components/areas/sls/_composables/useReport";
  import { useSalesTab } from "src/components/areas/dashboard/_composables/salesTab/useSalesTab";
  import { useRevenueExpenseState } from "../../_composables/generalTab/useRevenueExpenseState";
  import { useRevenueExpense } from "../../_composables/generalTab/useRevenueExpense";
  import { useSalesChartOptions } from "./_composables/useSalesChartOptions";

  import ApexChart from "vue3-apexcharts";
  import SalesSparkline from "./SalesSparkline.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const $q = useQuasar();
  const draggable = useSalesTab();
  const reportStore = useReport("invoiceByProduct");
  const revenueExpenseStore = useRevenueExpense(
    useRevenueExpenseState()
  );

  const { chartOptions } = useSalesChartOptions(reportStore, $q);

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );

  const formatRevenue = (value) => helper.formatNumberReadable(value);

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };
</script>
