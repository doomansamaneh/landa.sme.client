<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    flat
    class="shadow bordered fit"
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
      <q-card-section class="q-pa-lg">
        <div class="row full-width">
          <div class="col column q-gutter-y-sm">
            <div class="text-h6 text-weight-700">
              <q-item class="no-padding">
                <q-item-section avatar>
                  <q-avatar
                    rounded
                    text-color="white"
                    icon="o_arrow_downward"
                    size="md"
                    class="primary-gradient primary-shadow"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-weight-700">
                    درآمد
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

            <div class="text-body1 no-letter-spacing text-weight-700">
              {{
                helper.formatNumberReadable(
                  netIncomeStore.thisYearRevenue?.value
                )
              }}
              <!-- <span
                class="text-body2 text-weight-300 no-letter-spacing caption-on-dark"
              >
                ({{
                  helper.formatNumber(
                    netIncomeStore.thisYearRevenue?.value
                  )
                }})
              </span> -->
            </div>
            <q-item-label class="text-body3 no-letter-spacing">
              <span v-if="netIncomeStore.revenuePercent?.value > 0">
                <q-icon
                  name="arrow_upward"
                  size="18px"
                  color="green"
                />
                رشد
              </span>
              <span v-else>
                <q-icon
                  name="arrow_downward"
                  size="18px"
                  color="red"
                />
                کاهش
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
              به نسبت پارسال
            </q-item-label>
            <!-- <q-btn
              class="q-mt-md primary-gradient primary-shadow text-body3"
              rounded
              text-color="white"
              unelevated
              style="width: 120px"
            >
              جزئیات بیشتر
            </q-btn> -->
          </div>
          <div class="col-4">
            <vue-apex-charts
              ref="incomeChart"
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
  import { ref, onMounted, watch, computed } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useNetIncome } from "../../acc/_composables/useNetIncome";
  import { useDraggableWidgets } from "src/composables/useDraggableWidgets";

  import VueApexCharts from "vue3-apexcharts";

  const props = defineProps(["legend", "title"]);
  const emit = defineEmits(["hideWidget"]);

  const $q = useQuasar();
  const draggable = useDraggableWidgets();
  const netIncomeStore = useNetIncome();

  const hideWidget = () => {
    emit("hideWidget");
  };

  const incomeChart = ref(null);

  const options = ref(null);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir-thin" : "Roboto";

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
          // borderRadius: 5,
          // horizontal: false,
          columnWidth: $q.screen.gt.xs ? "15%" : "20%",
          // distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      // stroke: {
      //   width: 2.5,
      // },
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
        // offsetY: 16,
        markers: {
          width: 14,
          height: 14,
          radius: 4,
          offsetX: $q.lang.rtl ? "-4" : "-4",
        },
        itemMargin: {
          // vertical: 16,
          // horizontal: 16,
        },
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
    }
  );

  watch(
    () => $q.lang.rtl,
    () => {
      setOptions();
    }
  );

  onMounted(() => {
    setOptions();
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

  const isShakingComputed = computed(() => draggable.isShaking.value);
</script>
