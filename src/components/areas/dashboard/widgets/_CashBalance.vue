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
      <q-card-section>
        <widget-title :label="title" icon="o_inbox" />

        <!-- <template v-else-if="dataSource.chartSeries.value.length">
        <balance-chart
          :data-source="dataSource"
          :chart-type="chartType"
          :height="height"
        />
      </template> -->
      </q-card-section>

      <q-card-section class="q-pt-none q-px-none">
        <q-scroll-area
          :bar-style="helper.barStyle"
          :thumb-style="helper.thumbStyle"
          :style="$q.screen.xs ? 'height: 280px' : 'height: 300px'"
        >
          <balance-list :data-source="dataSource" />
        </q-scroll-area>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/useGeneralTab";

  const draggable = useGeneralTab();

  import BalanceChart from "./_CashBalanceChart.vue";
  import BalanceList from "./_CashBalanceList.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const props = defineProps({
    title: String,
    action: String,
    height: String,
    chartType: { default: "pie", type: String },
  });

  const dataSource = useBankAccount(`get${props.action}Debit`);
  const isShakingComputed = computed(() => draggable.isShaking.value);
</script>
