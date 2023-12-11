<template>
  <div class="container fit">

    <q-card
      class="q-pa-none"
      flat
      bordered
    >
      <q-card-section class="col q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">دریافت</div>
        <div class="text-caption text-grey">
          امسال
        </div>
      </q-card-section>

      <chart
        :options="options"
        :series="series"
        :legend="legend"
        :title="title"
        class="line-chart"
        :class="direction"
      />

    </q-card>

    <q-card
      class="no-margin"
      flat
      bordered
    >
      <q-card-section class="col q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">دریافت</div>
        <div class="text-caption text-grey">
          امسال
        </div>
      </q-card-section>

      <chart
        :options="options"
        :series="series"
        :height="height"
        :legend="legend"
        :title="title"
        class="line-chart"
        :class="direction"
      />

    </q-card>

    <q-card
      class="no-margin"
      flat
      bordered
    >
      <q-card-section class="col q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">دریافت</div>
        <div class="text-caption text-grey">
          امسال
        </div>
      </q-card-section>

      <chart
        :options="options"
        :series="series"
        :height="height"
        :legend="legend"
        :title="title"
        class="line-chart"
        :class="direction"
      />

    </q-card>

    <q-card
      class="no-margin"
      flat
      bordered
    >
      <q-card-section class="col q-pt-xs">
        <div class="text-h5 q-mt-sm q-mb-xs">دریافت</div>
        <div class="text-caption text-grey">
          امسال
        </div>
      </q-card-section>

      <chart
        :options="options"
        :series="series"
        :height="height"
        :legend="legend"
        :title="title"
        class="line-chart"
        :class="direction"
      />

    </q-card>


  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import Chart from 'src/components/shared/Charts/ChartView.vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps(['height', 'legend', 'title'])

const options = ref(null)

const series = ref([
  {
    name: "دریافت",
    data: [
      32000000, 33000000, 35000000, 1000000,
      98000000, 23000000, 56000000, 64000000,
      12000000, 79000000, 75000000, 42000000
    ],
  },

])

function setOptions() {

  const fontFamily = $q.lang.rtl ? 'Vazir FD' : 'Roboto';

  options.value = {
    title: {
      text: props.title,
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: $q.dark.isActive ? 'white' : '#2d2d2d'
      },
    },
    chart: {
      // dropShadow: {
      //   enabled: true,
      //   top: 8,
      //   left: 0,
      //   blur: 6,
      //   opacity: 0.2,
      //   color: '#3cff3c'
      // },
      // offsetY: 4,
      fontFamily,
      type: 'area',
      parentHeightOffset: 0,
      sparkline: {
        enabled: true
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
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

    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 4,
      curve: 'smooth'
    },
    markers: {
      size: 0,
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0
      },
      lines: {
        show: false
      },
      borderColor: $q.dark.isActive ? '#ffffff47' : '#2d2d2d2d',
    },
    xaxis: {
      show: false,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      categories: [
        'فروردین', 'اردیبهشت', 'خرداد',
        'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر',
        'دی', 'بهمن', 'اسفند'
      ],
      labels: {
        show: false,
        style: {
          colors: $q.dark.isActive ? 'white' : '#2d2d2d',
        },
      },
    },
    yaxis: {
      show: false,
      opposite: false,
      labels: {
        show: false,
        style: {
          colors: $q.dark.isActive ? 'white' : '#2d2d2d',
        },
        formatter: function (value) {
          return formatYAxisLabel(value);
        },
      },
    },
    legend: {
      show: props.legend,
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
    colors: ["rgb(0, 255, 0)", "rgb(255, 0, 0)", "rgb(0, 155, 227)", "rgb(36, 183, 160)"],
    tooltip: {
      enabled: true,
      x: {
        show: false,
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
  }
  //   // custom: function ({ series, seriesIndex, dataPointIndex, w }) {
  //   //   let tooltipText = '<div class="apex-custom-tooltip column q-gutter-y-sm q-pa-md">';
  //   //   series.forEach((singleSeries, index) => {
  //   //     tooltipText += `<span>
  //   //       ${w.config.series[index].name}: ${singleSeries[dataPointIndex].toLocaleString()}
  //   //   </span>`;
  //   //   });
  //   //   tooltipText += '</div>';
  //   //   return tooltipText;
  //   // }

  // },

}

const direction = computed(() => {
  return $q.lang.rtl ? 'rtl' : 'ltr';
})

watch(() => $q.dark.isActive, () => {
  setOptions()
})

watch(() => $q.lang.rtl, () => {
  setOptions()
})

onMounted(() => {
  setOptions()
})

function formatYAxisLabel(value) {
  const parts = String(value).split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let formattedValue = integerPart;

  if (parts.length > 1) {
    formattedValue += '.' + parts[1];
  }

  return formattedValue;
}

</script>

<style>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 24px;
}
</style>
