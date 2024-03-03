<template>
  <q-card class="fit no-shadow bordered">
    <q-card-section class="q-pt-lg q-pb-xl q-px-lg">
      <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar rounded color="primary" text-color="white" icon="o_inbox" size="md" class="primary-shadow" />
        </q-item-section>
        <q-item-section class="q-pl-xs">
          <q-item-label class="text-body1 q-mb-xs">موجودی صندوق</q-item-label>
        </q-item-section>
      </q-item>
      <chart :options="options" :series="series" :legend="true" :height="300" :title="title" class="donut-chart"
        :class="direction" @dataPointSelection="dataPointSelection" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch, computed } from 'vue'
import Chart from 'src/components/shared/Charts/ChartView.vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps(['height', 'legend', 'title'])

const options = ref(null)

const series = ref([
  805840240,
])

function setOptions() {

  const fontFamily = $q.lang.rtl ? 'vazir-thin' : 'Roboto';

  options.value = {
    labels: ['جاری شرکا'],
    title: {
      text: props.title,
      align: 'top',
      margin: 0,
      offsetX: 0,
      offsetY: 0,
      floating: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: $q.dark.isActive ? 'white' : '#2d2d2d',
      },
    },
    chart: {
      offsetY: 4,
      fontFamily,
      type: 'donut',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 600,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 450
        },
      }
    },
    plotOptions: {
      pie: {
        customScale: 1,
        // expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            total: {
              show: true,
              label: $q.lang.rtl ? 'مجموع' : 'Total',
              color: $q.dark.isActive ? 'white' : '#2d2d2d',
              fontSize: '16px',
              formatter: function (w) {
                const totalSum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);

                return totalSum.toLocaleString();
              }

            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              color: $q.dark.isActive ? 'white' : '#2d2d2d',
              offsetY: 4,
              formatter: function (value) {
                return formatLabel(value);
              },
            },
            name: {
              show: false,
            }
          }

        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    stroke: {
      width: 10,
      colors: $q.dark.isActive ? 'var(--q-dark)' : 'white',
    },
    markers: {
      size: 0,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      inverseOrder: true,
      labels: {
        colors: $q.dark.isActive ? 'white' : '#2d2d2d',
      },
      position: 'bottom',
      fontSize: '14px',
      fontWeight: 400,
      offsetY: 16,
      markers: {
        width: 14,
        height: 14,
        radius: 4,
        offsetX: $q.lang.rtl ? '-4' : '-4',
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
        fontSize: '13px',
      },
      marker: {
        width: 8,
        height: 8,
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    }
  }

}

const direction = computed(() => {
  return $q.lang.rtl ? 'rtl' : 'ltr';
})

watch(() => {
  return [$q.dark.isActive, $q.lang.rtl];
}, () => {
  setOptions();
});

onMounted(() => {
  setOptions();
})

function formatLabel(value) {
  const parts = String(value).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let formattedValue = integerPart;

  if (parts.length > 1) {
    formattedValue += '.' + parts[1];
  }

  return formattedValue;
}

const dataPointSelection = (event, chartContext, config) => {

  alert(config.w.config.labels[config.dataPointIndex]);
  // console.log('Event:', event);
  // console.log('Chart Context:', chartContext);
  // console.log('Config:', config);
  // console.log('Labels:', config.w.config.labels);
  // console.log('Data Point Index:', config.dataPointIndex);
}

</script>
