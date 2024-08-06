<template>
  <q-card class="fit no-shadow bordered">
    <q-card-section class="q-pt-lg q-pb-xl q-px-lg">
      <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar
            rounded
            text-color="white"
            icon="o_inbox"
            size="md"
            class="primary-gradient primary-shadow"
          />
        </q-item-section>
        <q-item-section class="q-pl-xs">
          <q-item-label class="text-h6 text-weight-700 q-mb-xs">
            {{ title }}
          </q-item-label>
          <q-item-label class="text-subtitle2 text-weight-700">
            {{ helper.formatNumber(dataSource.total.value) }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <template v-if="dataSource.chartSeries.value.length > 5">
        <q-banner
          v-for="item in dataSource.model.value"
          :key="item.id"
          inline-actions
          rounded
          class="q-my-sm bordered bg-orange_text-white"
        >
          <span class="text-subtitle2">
            {{ item.label }}
          </span>

          <template v-slot:action>
            <span class="text-weight-600 q-mx-sm">
              {{ helper.formatNumber(item.amount) }}
            </span>

            <q-btn
              round
              unelevated
              dense
              class="text-on-dark"
              :to="`/acc/accountDL/Preview/${item.id}`"
              icon="keyboard_arrow_left"
            >
              <q-tooltip class="custom-tooltip">
                {{ $t("shared.labels.showDetail") }}
              </q-tooltip>
            </q-btn>
          </template>
        </q-banner>
      </template>
      <template v-else-if="dataSource.chartSeries.value.length">
        <chart
          :series="dataSource.chartSeries.value"
          :options="options"
          legend
          :height="300"
          :class="direction"
          @dataPointSelection="dataPointSelection"
        />
      </template>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";

  import Chart from "src/components/shared/Charts/ChartView.vue";

  const props = defineProps({
    title: String,
    action: String,
    chartType: { default: "pie", type: String },
  });

  const $q = useQuasar();
  const dataSource = useBankAccount(`get${props.action}Debit`);

  const options = ref(null);

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir-thin" : "Roboto";

    options.value = {
      labels: dataSource.chartLabels,
      title: {
        //text: props.title,
        align: "top",
        margin: 0,
        offsetX: 0,
        offsetY: 0,
        floating: true,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: $q.dark.isActive ? "white" : "#2d2d2d",
        },
      },
      chart: {
        offsetY: 4,
        fontFamily,
        type: props.chartType,
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
        pie: {
          customScale: 1,
          expandOnClick: true,
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: false,
                label: $q.lang.rtl ? "مجموع" : "Total",
                color: $q.dark.isActive ? "white" : "#2d2d2d",
                fontSize: "16px",
                // formatter: function (w) {
                //   const totalSum = w.globals.seriesTotals.reduce(
                //     (a, b) => {
                //       return a + b;
                //     },
                //     0
                //   );

                //   return totalSum.toLocaleString();
                // },
              },
              value: {
                show: true,
                fontSize: "15px",
                fontWeight: 600,
                color: $q.dark.isActive ? "white" : "#2d2d2d",
                offsetY: 4,
                formatter: function (value) {
                  return helper.formatNumber(value);
                },
              },
              name: {
                show: false,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      stroke: {
        width: 10,
        colors: $q.dark.isActive ? "var(--q-dark)" : "white",
      },
      markers: {
        size: 0,
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        inverseOrder: true,
        labels: {
          colors: $q.dark.isActive ? "white" : "#2d2d2d",
        },
        position: $q.screen.lt.md ? "bottom" : "right",
        fontSize: "14px",
        fontWeight: 400,
        offsetY: 16,
        markers: {
          width: 14,
          height: 14,
          radius: 4,
          offsetX: $q.lang.rtl ? "-4" : "-4",
        },
        itemMargin: {
          vertical: 16,
          horizontal: 16,
        },
      },
      tooltip: {
        enabled: false,
        x: {
          show: true,
        },
        y: {
          show: true,
        },
        style: {
          fontSize: "13px",
        },
        marker: {
          width: 8,
          height: 8,
        },
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },
    };
  }

  const direction = computed(() => {
    return $q.lang.rtl ? "rtl" : "ltr";
  });

  watch(
    () => {
      return [$q.dark.isActive, $q.lang.rtl];
    },
    () => {
      setOptions();
    }
  );

  onMounted(() => {
    setOptions();
  });

  const dataPointSelection = (event, chartContext, config) => {
    //alert(config.w.config.labels[config.dataPointIndex]);
    // console.log('Event:', event);
    // console.log('Chart Context:', chartContext);
    // console.log('Config:', config);
    // console.log('Labels:', config.w.config.labels);
    // console.log('Data Point Index:', config.dataPointIndex);
  };
</script>
