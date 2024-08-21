<template>
  <q-card class="fit bordered" flat>
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

        <q-item-section class="q-pl-xs">
          <q-item-label class="text-h6 text-weight-700 q-mb-xs">
            نمودار فروش سال مالی جاری
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <chart :data-source="dataSource" :height="170"></chart>
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
