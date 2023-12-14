<template>
  <div class="row gap-24">
    <div class="col-8 col-md-8 col-sm-12">
      <invoices-widget-v2 />
    </div>
    <div class="col">
      <q-card>
        <q-card-section>
          فقط 40 روز مانده تا انقضای حساب
        </q-card-section>
      </q-card>
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
    <div class="col">
      <q-card class="no-shadow bordered">
        <q-card-section class="row justify-between items-center q-pa-lg">
          <div class="text-body1">لیست کارها</div>
          <div class="row items-center">
            <q-btn
              unelevated
              size="8px"
              round
              icon="o_add"
              color="primary"
              text-color="white"
              class="primary-shadow"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-pb-lg">

          <q-scroll-area style="height: 480px;">
            <q-list class="column q-gutter-y-md">

              <q-item
                class="q-pl-none q-pr-lg"
                v-for="n in 9"
                :key="n"
              >

                <q-item-section
                  side
                  top
                >
                  <q-checkbox
                    round
                    size="sm"
                    v-model="check1"
                  />

                </q-item-section>

                <div class="q-pl-sm">

                  <div
                    class="text-body2 line-height-xs"
                    :class="checked"
                  >خرید سیب زمینی پیاز برای کارگاه + خرید دو تن جوانه گندم برای
                    آشپزخانه جهت تولید حلیم</div>
                  <div class="row q-gutter-x-md q-mt-sm items-center">
                    <span class="text-body3">23 شهریور 1402</span>
                    <q-badge
                      class="q-py-sm q-px-md"
                      rounded
                      color="positive"
                      label="انجام شده"
                    />
                  </div>

                </div>

              </q-item>

            </q-list>
          </q-scroll-area>

        </q-card-section>
      </q-card>
    </div>

    <div class="col-8">
      <div class="column">
        <div class="col-8">
          <income-widget />
        </div>

        <div class="col">
          <q-card class="fit q-mt-lg darkBGImg">
            <q-card-section>
              <h1>Hello</h1>
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
          <div class="text-body1">موجودی بانک</div>
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
          <div class="text-body1">موجودی صندوق</div>
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

const check1 = ref(false)

const checked = computed(() => {
  return check1.value ? "text-strike" : "";
});


</script>

<style lang="scss">
.gap-24 {
  gap: 24px;
}

.darkBGImg {
  background: $dark url("../../../../public/triangle-light.png") repeat-y left top;
}
</style>

