<template>
  <q-card>
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
  import { ref, provide } from "vue";

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

  console.log(dataSource.chartLabels);

  const option = ref(null);

  option.value = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        fontFamily: "vazir-thin",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
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
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
</script>

<style lang="scss" scoped>
  .chart {
    height: 70vh;
  }
</style>
