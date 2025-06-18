<template>
  <q-card
    v-access="`acc.report.accountReview`"
    class="shadow fit bordered"
    flat
  >
    <q-card-section class="q-pb-none">
      <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar
            rounded
            text-color="white"
            icon="o_shopping_basket"
            size="md"
            class="primary-gradient primary-shadow"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            نمودار فروش سال مالی جاری
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <chart
      style="min-height: 200px"
      :data-source="dataSource"
      :height="200"
    />
  </q-card>
</template>

<script setup>
  const props = defineProps({ customerId: String });

  import { guidEmpty } from "src/constants";
  import Chart from "./_RevenueExpenseChart.vue";
  const dataSource = `acc/report/revenueByCustomerMonth/${
    props.customerId ?? guidEmpty
  }`;
</script>
