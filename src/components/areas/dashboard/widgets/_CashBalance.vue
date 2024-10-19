<template>
  <q-card class="shadow bordered">
    <q-card-section class="q-py-lg q-pr-md q-pl-lg">
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
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ title }}
          </q-item-label>
          <q-item-label class="text-subtitle2 text-weight-700">
            {{ helper.formatNumber(dataSource.total.value) }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-scroll-area style="height: 300px">
        <balance-list :data-source="dataSource" />
      </q-scroll-area>

      <!-- <template v-else-if="dataSource.chartSeries.value.length">
        <balance-chart
          :data-source="dataSource"
          :chart-type="chartType"
          :height="height"
        />
      </template> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";

  import BalanceChart from "./_CashBalanceChart.vue";
  import BalanceList from "./_CashBalanceList.vue";

  const props = defineProps({
    title: String,
    action: String,
    height: String,
    chartType: { default: "pie", type: String },
  });

  const dataSource = useBankAccount(`get${props.action}Debit`);
</script>
