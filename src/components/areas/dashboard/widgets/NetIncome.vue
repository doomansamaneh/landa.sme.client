<template>
  <q-card
    v-access="`acc.report.accountReview`"
    :class="[isShakingComputed ? 'widget' : '']"
    flat
    class="shadow bordered fit"
    :style="
      $q.lang.rtl ? 'font-family: vazir;' : 'font-family: Roboto;'
    "
  >
    <q-inner-loading
      :showing="netIncomeStore?.showLoader?.value"
      class="transparent z-1"
    >
      <q-spinner size="52px" color="primary" />
    </q-inner-loading>

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
      <q-card-section>
        <div class="row">
          <div class="col">
            <widget-title
              :label="$t('shared.labels.revenue')"
              icon="arrow_downward"
            />

            <div class="q-mt-md">
              <div class="text-body1 text-weight-700">
                {{
                  helper.formatNumberReadable(
                    netIncomeStore.thisYearRevenue?.value
                  )
                }}
              </div>
              <q-item-label class="text-body3">
                <span v-if="netIncomeStore.revenuePercent?.value > 0">
                  <q-icon
                    name="arrow_upward"
                    size="18px"
                    color="green"
                  />
                  {{ $t("shared.labels.growth") }}
                </span>
                <span v-else>
                  <q-icon
                    name="arrow_downward"
                    size="18px"
                    color="red"
                  />
                  {{ $t("shared.labels.decrease") }}
                </span>
                <span
                  class="text-body2 text-bold"
                  :class="
                    netIncomeStore.revenuePercent?.value > 0
                      ? 'text-green'
                      : 'text-red'
                  "
                >
                  {{
                    helper.formatNumber(
                      netIncomeStore.revenuePercent?.value,
                      2
                    )
                  }}%
                </span>
                {{ $t("shared.labels.comparedToLastYear") }}
              </q-item-label>
            </div>
          </div>
          <div class="col-4">
            <vue-apex-charts
              v-if="
                netIncomeStore.chartSeries.value && isChartVisible
              "
              ref="chartRef"
              :options="options"
              :series="netIncomeStore.chartSeries.value"
              height="140"
              :legend="legend"
              :title="title"
              class="bar-chart"
              :class="direction"
            />
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import {
    ref,
    onMounted,
    watch,
    computed,
    onActivated,
    onDeactivated,
  } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useNetIncome } from "../../acc/_composables/useNetIncome";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/generalTab/useGeneralTab";

  import VueApexCharts from "vue3-apexcharts";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const props = defineProps(["legend", "title"]);
  const emit = defineEmits(["hideWidget"]);

  const $q = useQuasar();
  const draggable = useGeneralTab();
  const netIncomeStore = useNetIncome();

  const hideWidget = () => {
    emit("hideWidget");
  };

  const chartRef = ref(null);
  const isChartVisible = ref(true);
  const options = ref(null);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      title: {
        text: props.title,
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: $q.dark.isActive ? "white" : "#2d2d2d",
        },
      },
      chart: {
        offsetY: 0,
        parentHeightOffset: 0,
        fontFamily,
        type: "bar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 600,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 450,
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: $q.screen.gt.xs ? "15%" : "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      grid: {
        show: false,
        strokeDashArray: 5,
        borderColor: $q.dark.isActive ? "#ffffff47" : "#2d2d2d2d",
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: ["پارسال", "امسال"],
        labels: {
          show: false,
          offsetY: 12,
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
        },
      },
      yaxis: {
        show: false,
        opposite: false,
        labels: {
          style: {
            colors: $q.dark.isActive ? "white" : "#2d2d2d",
          },
          formatter: function (value) {
            return formatYAxisLabel(value);
          },
        },
      },
      legend: {
        show: props.legend,
        showForSingleSeries: true,
        inverseOrder: true,
        labels: {
          colors: $q.dark.isActive ? "white" : "#2d2d2d",
        },
        position: "top",
        fontSize: "14px",
        fontWeight: 400,
        markers: {
          width: 14,
          height: 14,
          radius: 4,
          offsetX: $q.lang.rtl ? "-4" : "-4",
        },
        itemMargin: {},
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: true,
          title: {
            formatter: (seriesName) => seriesName == "",
          },
        },
        style: {
          fontSize: "13px",
        },
        marker: {
          width: 8,
          height: 8,
        },
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetX: 0,
          offsetY: 0,
        },
      },
    };
  }

  const direction = computed(() => {
    return $q.lang.rtl ? "rtl" : "ltr";
  });

  watch(
    () => $q.dark.isActive,
    () => {
      setOptions();
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }
  );

  watch(
    () => $q.lang.rtl,
    () => {
      setOptions();
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }
  );

  onActivated(() => {
    isChartVisible.value = false;
    setTimeout(() => {
      isChartVisible.value = true;
      if (chartRef.value?.chart) {
        chartRef.value.chart.updateOptions(options.value, true);
      }
    }, 0);
  });

  onDeactivated(() => {
    isChartVisible.value = false;
  });

  onMounted(() => {
    setOptions();
    if (chartRef.value?.chart) {
      chartRef.value.chart.updateOptions(options.value, true);
    }
  });

  function formatYAxisLabel(value) {
    const parts = String(value).split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    let formattedValue = integerPart;

    if (parts.length > 1) {
      formattedValue += "." + parts[1];
    }

    return formattedValue;
  }

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
