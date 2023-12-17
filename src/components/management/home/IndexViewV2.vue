<template>
  <div class="row gap-24">
    <div class="col-8 col-md-8 col-sm-12">
      <invoices-widget-v2 />
    </div>
    <div class="col">
      <some-info />
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

  <div class="row q-mt-lg gap-24">
    <div class="col-8 col-md-8 col-sm-12 column q-gutter-y-lg">
      <income-widget />
    </div>

    <div class="col col-md col-sm-12 gap-24">
      <top-products />
    </div>

  </div>

  <div class="row q-mt-lg gap-24">

    <div class="col col-md col-sm-12">
      <q-card class="fit no-shadow bordered">
        <q-card-section class="q-pa-lg">
          <q-item class="no-padding">
            <q-item-section avatar>
              <q-avatar
                rounded
                color="primary"
                text-color="white"
                icon="o_inbox"
                size="md"
                class="primary-shadow"
              />
            </q-item-section>
            <q-item-section class="q-pl-xs">
              <q-item-label class="text-body1 q-mb-xs">موجودی صندوق</q-item-label>
            </q-item-section>
          </q-item>
          <donut-chart
            :height="350"
            width="100%"
            :legend="true"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-8 col-md-8 col-sm-12">
      <bank-balance />
    </div>

  </div>
</template>

<script setup>
import { computed, ref } from "vue"
import InvoicesWidgetV2 from 'src/components/shared/Widgets/InvoicesWidgetV2.vue'
import SalesWidget from 'src/components/shared/Widgets/SalesWidget.vue'
import RatiosWidget from 'src/components/shared/Widgets/RatiosWidget.vue'
import SalesIncomeWidget from 'src/components/shared/Widgets/SalesIncomeWidget.vue'
import DonutChart from 'src/components/shared/Charts/DonutChart.vue'
import IncomeWidget from 'src/components/shared/Widgets/_IncomeWidget.vue'
import InfoCarousel from 'src/components/shared/Widgets/InfoCarousel.vue'
import TodoList from 'src/components/shared/Widgets/TodoList.vue'
import TopProducts from 'src/components/shared/Widgets/TopProducts.vue'
import SomeInfo from 'src/components/shared/Widgets/NetIncome.vue'
import BankBalance from 'src/components/shared/Widgets/BankBalance.vue'



</script>

<style lang="scss">
.gap-24 {
  gap: 24px;
}

.darkBGImg {
  background: $dark url("../../../../public/triangle-light.png") repeat-y left top;
}
</style>

