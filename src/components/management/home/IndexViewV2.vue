<template>
  <div>
    <div class="row gap-24">
      <div class="col-8 col-md-8 col-sm-12 col-xs-12">
        <invoices-widget-v2 />
      </div>
      <div class="col col-md col-xs-12">
        <some-info />
      </div>
    </div>

    <div class="row gap-24 q-mt-lg">
      <div class="col col-md col-xs-12">
        <ratios-widget />
      </div>
      <div class="col-8 col-md-8 col-sm-12 col-xs-12">
        <sales-income-widget />
      </div>
    </div>

    <div class="row q-mt-lg gap-24">
      <div class="col-8 col-md-8 col-sm-12 col-xs-12 column q-gutter-y-lg">
        <income-widget />
      </div>

      <div class="col col-md col-sm-12 col-xs-12 gap-24">
        <top-products />
      </div>

    </div>

    <div class="row q-mt-lg gap-24">

      <div class="col col-md col-sm-12 col-xs-12">
        <fund-balance />
      </div>

      <div class="col-8 col-md-8 col-sm-12 col-xs-12">
        <bank-balance />
      </div>

    </div>
  </div>
</template>

<script setup>
import InvoicesWidgetV2 from 'src/components/shared/Widgets/InvoicesWidgetV2.vue'
import RatiosWidget from 'src/components/shared/Widgets/RatiosWidget.vue'
import SalesIncomeWidget from 'src/components/shared/Widgets/SalesIncomeWidget.vue'
import IncomeWidget from 'src/components/shared/Widgets/_IncomeWidget.vue'
import TopProducts from 'src/components/shared/Widgets/TopProducts.vue'
import SomeInfo from 'src/components/shared/Widgets/NetIncome.vue'
import BankBalance from 'src/components/shared/Widgets/BankBalance.vue'
import FundBalance from 'src/components/shared/Widgets/FundBalance.vue'

import { useHeader } from "src/composables/mobile/useHeader"
import { computed } from 'vue'

const headerStore = useHeader()

const marginTop = computed(() => {
  return headerStore.showHeader.value === false ? 'margin-lg' : ''
})
</script>

<style lang="scss">
.margin-lg {
  margin-top: 24px;
  -webkit-transition: padding 0.25s ease-in-out;
  transition: padding 0.25s ease-in-out;
}

.gap-24 {
  gap: 24px;
}

.darkBGImg {
  background: $dark url("../../../../public/triangle-light.png") repeat-y left top;
}
</style>

