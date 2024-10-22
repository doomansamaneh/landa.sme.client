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

    <q-card-section class="q-pt-none q-pb-lg q-px-lg">
      <div class="row q-col-gutter-md">
        <div class="col-3">
          <product-group-chart :height="300" />
        </div>

        <div class="col">
          <customer-chart :height="300" />
        </div>

        <div class="col">
          <product-chart :height="300" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import ProductChart from "src/components/areas/dashboard/widgets/sales/ProductChart.vue";
  import ProductGroupChart from "src/components/areas/dashboard/widgets/sales/ProductGroupChart.vue";
  import CustomerChart from "src/components/areas/dashboard/widgets/sales/CustomerChart.vue";
</script>
