<template>
  <q-card flat class="fit bordered shadow">
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
                فروش
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <product-chart :height="220" class="absolute-top-right z-max" />
    </q-card-section>
    <q-card-section>
      <product-group-chart class="absolute-top-left z-1" />
    </q-card-section>
    <q-card-section class="q-pa-none">
      <customer-chart :height="220" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import ProductGroupChart from "src/components/areas/dashboard/widgets/sales/ProductGroupChart.vue";
  import ProductChart from "src/components/areas/dashboard/widgets/sales/ProductChart.vue";
  import CustomerChart from "src/components/areas/dashboard/widgets/sales/CustomerChart.vue";
</script>
