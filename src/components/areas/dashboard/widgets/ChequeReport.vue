<template>
  <q-card flat class="fit_ bordered shadow">
    <q-card-section class="q-pt-lg q-px-lg q-pb-none">
      <div class="row justify-between items-center">
        <div>
          <q-item class="no-padding">
            <q-item-section avatar>
              <q-avatar
                rounded
                text-color="white"
                icon="o_receipt_long"
                size="md"
                class="primary-gradient primary-shadow"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-weight-700">
                گزارش چک
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div>
          <q-btn no-caps rounded padding="4px 12px" unelevated dense>
            ماهانه
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pt-md q-pb-lg q-px-lg">
      <chart
        :height="150"
        :series="series"
        :options="options"
        legend
        :class="direction"
        @dataPointSelection="dataPointSelection"
      />
      <q-scroll-area style="height: 150px">
        <q-list class="q-mt-sm">
          <q-item
            class="border-radius-sm"
            clickable
            v-for="n in 3"
            :key="n"
          >
            آقای هاشمی
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>
    <!-- <q-card-section class="q-pa-lg">
      <div class="row items-center q-gutter-lg justify-center">
        <div class="row items-center cursor-pointer" unelevated>
          <div>
            <span class="text-body2  q-mr-xs">
              نقد شده
            </span>
            <q-btn no-caps
              unelevated
              class="no-pointer-events border-radius-xs"
              padding="6.5px 7px"
              color="green"
            />
          </div>
        </div>
        <div class="row items-center cursor-pointer" unelevated>
          <div>
            <span class="text-body2  q-mr-xs">
            نقد نشده
          </span>
          <q-btn no-caps
            unelevated
            class="no-pointer-events border-radius-xs"
            padding="6.5px 7px"
            color="blue"
          />
          </div>
        </div>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import Chart from "src/components/shared/charts/ChartView.vue";

  const $q = useQuasar();
  const options = ref(null);

  // Add the data for your pie chart
  const series = ref([30, 70]); // 30% نقده شده, 70% نقد نشده

  function setOptions() {
    const fontFamily = $q.lang.rtl ? "vazir" : "Roboto";

    options.value = {
      labels: ["نقده شده", "نقد نشده"],
      title: {
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
        type: "pie",
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
          expandOnClick: true,
          donut: {
            size: "100%",
            labels: {
              show: false,
              total: {
                show: false,
                label: $q.lang.rtl ? "مجموع" : "Total",
                color: $q.dark.isActive ? "white" : "#2d2d2d",
                fontSize: "16px",
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
        type: "solid",
      },
      stroke: {
        width: 0,
        colors: $q.dark.isActive ? "var(--q-dark)" : "white",
      },
      legend: {
        show: false,
        inverseOrder: true,
        labels: {
          colors: $q.dark.isActive ? "white" : "#2d2d2d",
        },
        position: $q.screen.lt.md ? "bottom" : "bottom",
        horizontalAlign: "left",
        fontSize: "14px",
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
        enabled: true,
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
    console.log(
      "Selected Label:",
      config.w.config.labels[config.dataPointIndex]
    );
    console.log(
      "Selected Value:",
      series.value[config.dataPointIndex]
    );
  };
</script>
