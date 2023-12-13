<template>
    <div class="row gap-24">
    <div class="col-8 col-md-8 col-sm-12">
      <invoices-widget-v2 />
    </div>
    <div class="col">
      <sales-widget />
    </div>
  </div>

  <div class="row gap-24 q-mt-lg">
    <div class="col">
      <ratios-widget />
    </div>
    <div class="col-8 col-md-8 col-sm-12">
      <sales-income-widget />
    </div>
  </div>
</template>

<script setup>

import InvoicesWidgetV2 from 'src/components/shared/Widgets/InvoicesWidgetV2.vue'
import SalesWidget from 'src/components/shared/Widgets/SalesWidget.vue'
import RatiosWidget from 'src/components/shared/Widgets/RatiosWidget.vue'
import SalesIncomeWidget from 'src/components/shared/Widgets/SalesIncomeWidget.vue'

</script>

<style lang="scss">

.gap-24 {
  gap: 24px;
}

</style>

