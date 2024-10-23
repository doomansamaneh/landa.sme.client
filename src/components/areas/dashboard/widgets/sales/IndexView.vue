<template>
  <q-card flat class="fit- bordered shadow">
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
        <div class="col-md-2 col-sm-3 col-xs-6">
          <q-select
            dropdown-icon="o_expand_more"
            class="select"
            outlined
            dense
            v-model="filter"
            :options="filterOptions"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-lg q-px-lg q-pb-none">
      <div class="text-body1">فروش 30 روز پیش</div>
      <div class="text-h3 text-weight-700">16 همت</div>
      <div class="row text-body1 no-letter-spacing q-mb-md">
        <div class="ellipsis-3-lines text-weight-500 text-green-8">
          <q-icon color="green-8" size="20px" name="arrow_upward" />
          69% افزایش
        </div>
        <span class="q-ml-xs">نسبت به 30 روز پیش</span>
      </div>
    </q-card-section>
    <q-card-section :class="$q.screen.xs ? 'no-padding' : ''">
      <product-chart
        :height="250"
        class="z-1"
        :class="$q.screen.xs ? '' : 'absolute-top-right'"
      />
    </q-card-section>
    <q-card-section :class="$q.screen.xs ? 'no-padding' : ''">
      <product-group-chart class="z-1" />
    </q-card-section>
    <q-card-section class="q-pa-none">
      <customer-chart :height="$q.screen.gt.xs ? '220' : '300'" />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import ProductGroupChart from "src/components/areas/dashboard/widgets/sales/ProductGroupChart.vue";
  import ProductChart from "src/components/areas/dashboard/widgets/sales/ProductChart.vue";
  import CustomerChart from "src/components/areas/dashboard/widgets/sales/CustomerChart.vue";

  const filter = ref("30 روز پیش");
  const filterOptions = ["30 روز پیش", "این فصل", "امسال", "سال پیش"];
</script>
