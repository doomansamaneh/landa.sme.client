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
    <div class="col column q-gutter-y-lg">
      <top-products />
    </div>

    <div class="col-8">
      <div class="column">
        <div class="col-8">
          <income-widget />
        </div>

        <div class="col">
          <q-card class="fit q-mt-lg darkBGImg bordered">
            <q-card-section>
              <h1>سلام بر سیپاه دیلاور</h1>
            </q-card-section>

          </q-card>

        </div>
      </div>
    </div>


  </div>

  <div class="row q-mt-lg gap-24">

    <div class="col-8">
      <q-card class="no-shadow bordered">
        <q-card-section class="q-pa-lg">
          <q-item class="no-padding">
        <q-item-section avatar>
          <q-avatar
            rounded
            color="primary"
            text-color="white"
            icon="o_account_balance"
            size="md"
            class="primary-shadow"
          />
        </q-item-section>
        <q-item-section class="q-pl-xs">
          <q-item-label class="text-body2 q-mb-xs">موجودی بانک</q-item-label>
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

    <div class="col">
      <q-card class="no-shadow bordered">
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
              <q-item-label class="text-body2 q-mb-xs">موجودی صندوق</q-item-label>
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
import SomeInfo from 'src/components/shared/Widgets/SomeInfo.vue'



</script>

<style lang="scss">
.gap-24 {
  gap: 24px;
}

.darkBGImg {
  background: $dark url("../../../../public/triangle-light.png") repeat-y left top;
}
</style>

