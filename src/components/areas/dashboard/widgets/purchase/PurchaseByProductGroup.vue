<template>
  <q-card
    v-access="`sls.purchase.view`"
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow border-radius-lg bordered"
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
      <q-card-section class="q-pb-none">
        <widget-title
          :label="$t('shared.labels.purchasesByProductGroup')"
          icon="category"
        />
      </q-card-section>

      <q-inner-loading
        :showing="reportStore.showLoader.value"
        class="transparent z-1"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>
    </div>

    <q-card-section>
      <apex-chart
        v-if="reportStore.chartSeries.value && isChartVisible"
        class="pie-chart"
        type="donut"
        :options="chartOptions"
        :series="reportStore.chartSeries.value"
        ref="chartRef"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import {
    computed,
    ref,
    onMounted,
    onActivated,
    onDeactivated,
  } from "vue";
  import { useQuasar } from "quasar";

  import { helper } from "src/helpers";
  import { usePurchaseReport } from "src/components/areas/dashboard/_composables/purchaseTab/usePurchaseReport";
  import { usePurchaseTab } from "src/components/areas/dashboard/_composables/purchaseTab/usePurchaseTab";
  import { useProductGroupChartOptions } from "./_composables/useProductGroupChartOptions";

  import ApexChart from "vue3-apexcharts";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const $q = useQuasar();
  const draggable = usePurchaseTab();
  const reportStore = usePurchaseReport("purchaseByProductGroup");

  const { chartOptions } = useProductGroupChartOptions(
    reportStore,
    $q
  );

  const chartRef = ref(null);
  const isChartVisible = ref(true);

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );

  const formatExpense = (value) => helper.formatNumberReadable(value);

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  onActivated(() => {
    isChartVisible.value = false;
    setTimeout(() => {
      isChartVisible.value = true;
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(chartOptions.value, true);
      }
    }, 0);
  });

  onDeactivated(() => {
    isChartVisible.value = false;
  });

  onMounted(() => {
    if (chartRef.value?.chart) {
      chartRef.value.chart.updateOptions(chartOptions.value, true);
    }
  });
</script>
