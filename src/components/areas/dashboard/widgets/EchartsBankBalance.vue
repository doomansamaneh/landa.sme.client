<template>
  <q-card flat class="bordered shadow">
    <q-card-section class="q-pt-lg q-pb-none q-pr-md q-pl-lg">
      <q-item class="q-mb-lg no-padding">
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
            موجودی بانک
          </q-item-label>
          <q-item-label class="text-subtitle2 text-weight-700">
            {{ helper.formatNumber(dataSource.total.value) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <v-chart
      :style="$q.lang.rtl ? 'direction: ltr' : 'direction: rtl'"
      class="chart"
      :option="option"
      autoresize
    />
  </q-card>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";
  import { helper } from "src/helpers/helper";

  import { use } from "echarts/core";
  import { SVGRenderer } from "echarts/renderers";
  import { PieChart } from "echarts/charts";
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  } from "echarts/components";
  import VChart, { THEME_KEY } from "vue-echarts";
  import { ref, provide, watch, onMounted, computed } from "vue";

  use([
    SVGRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
  ]);
  const $q = useQuasar();

  provide(THEME_KEY, $q.dark.isActive ? "dark" : "light");

  const dataSource = useBankAccount(`getBankAccountDebit`);

  const option = ref(null);

  function setOption() {
    option.value = {
      tooltip: {
        trigger: "item",
        textStyle: {
          fontFamily: "vazir-thin",
          fontSize: 14,
        },
      },
      legend: {
        bottom: "40",
        padding: [24, 0, 24, 0],
        left: "center",
        textStyle: {
          color: $q.dark.isActive ? "white" : "black", // Change the color here
          fontFamily: "vazir-thin", // Change the font family here
          fontSize: 14, // Optionally, change the font size
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "40%"],
          startAngle: 180,
          endAngle: 360,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: computed(() =>
            dataSource.chartLabels.value.map((label, index) => ({
              value: dataSource.chartSeries.value[index],
              name: label,
            }))
          ),
        },
      ],
    };
  }

  watch(() => {
    setOption();
  });

  onMounted(() => {
    setOption();
  });
</script>

<style lang="scss" scoped>
  .chart {
    height: 70vh;
  }
</style>
