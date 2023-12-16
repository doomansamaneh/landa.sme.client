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

    <div class="col-8 col-md-8 col-sm-12 gap-24">
      <div class="column">
        <div class="col-8">
          <income-widget />
        </div>

        <div class="col">

          <div class="row q-gutter-x-lg q-mt-lg">
            <div class="col">
              <q-card
                class="fit bordered q-pa-none"
                flat
              >
                <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
                  <div class="row justify-between">
                    <q-avatar
                      round
                      color="blue-grey"
                      text-color="white"
                      icon="o_attach_money"
                      size="xl"
                      class="bluegrey-shadow"
                    />
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        round
                        dense
                        :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                        size="md"
                        icon="o_more_vert"
                      >

                        <q-menu fit>
                          <q-list
                            dense
                            padding
                            style="width:200px"
                          >
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSaleIncome"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  >
                                    <q-icon
                                      name="o_sell"
                                      size="14px"
                                    />
                                  </q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش و درآمد، هزینه</div>
                              </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSale"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_close"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش</div>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showCost"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_check"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">هزینه</div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

                  <div class="text-body2">حاشیه سود</div>
                  <div class="row items-center q-gutter-x-sm">
                    <div class="text-body1 text-bold">(178,015.03) %</div>
                    <div class="text-body2 text-bold text-negative">-%4</div>
                  </div>
                </q-card-section>

              </q-card>
            </div>

            <div class="col">
              <q-card
                class="fit bordered q-pa-none"
                flat
              >
                <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
                  <div class="row justify-between">
                    <q-avatar
                      round
                      color="blue-grey"
                      text-color="white"
                      icon="o_attach_money"
                      size="xl"
                      class="bluegrey-shadow"
                    />
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        round
                        dense
                        :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                        size="md"
                        icon="o_more_vert"
                      >

                        <q-menu fit>
                          <q-list
                            dense
                            padding
                            style="width:200px"
                          >
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSaleIncome"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  >
                                    <q-icon
                                      name="o_sell"
                                      size="14px"
                                    />
                                  </q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش و درآمد، هزینه</div>
                              </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSale"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_close"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش</div>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showCost"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_check"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">هزینه</div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

                  <div class="text-body2">حاشیه سود</div>
                  <div class="row items-center q-gutter-x-sm">
                    <div class="text-body1 text-bold">(178,015.03) %</div>
                    <div class="text-body2 text-bold text-negative">-%4</div>
                  </div>
                </q-card-section>

              </q-card>
            </div>

            <div class="col">
              <q-card
                class="fit bordered q-pa-none"
                flat
              >
                <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
                  <div class="row justify-between">
                    <q-avatar
                      round
                      color="blue-grey"
                      text-color="white"
                      icon="o_attach_money"
                      size="xl"
                      class="bluegrey-shadow"
                    />
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        round
                        dense
                        :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                        size="md"
                        icon="o_more_vert"
                      >

                        <q-menu fit>
                          <q-list
                            dense
                            padding
                            style="width:200px"
                          >
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSaleIncome"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  >
                                    <q-icon
                                      name="o_sell"
                                      size="14px"
                                    />
                                  </q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش و درآمد، هزینه</div>
                              </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSale"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_close"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش</div>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showCost"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_check"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">هزینه</div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

                  <div class="text-body2">حاشیه سود</div>
                  <div class="row items-center q-gutter-x-sm">
                    <div class="text-body1 text-bold">(178,015.03) %</div>
                    <div class="text-body2 text-bold text-negative">-%4</div>
                  </div>
                </q-card-section>

              </q-card>
            </div>

            <div class="col">
              <q-card
                class="fit bordered q-pa-none"
                flat
              >
                <q-card-section class="q-pr-md q-pl-lg q-pt-lg q-pb-none">
                  <div class="row justify-between">
                    <q-avatar
                      round
                      color="blue-grey"
                      text-color="white"
                      icon="o_attach_money"
                      size="xl"
                      class="bluegrey-shadow"
                    />
                    <div class="row items-center justify-end">
                      <q-btn
                        unelevated
                        round
                        dense
                        :text-color="$q.dark.isActive ? 'white' : 'grey-8'"
                        size="md"
                        icon="o_more_vert"
                      >

                        <q-menu fit>
                          <q-list
                            dense
                            padding
                            style="width:200px"
                          >
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSaleIncome"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  >
                                    <q-icon
                                      name="o_sell"
                                      size="14px"
                                    />
                                  </q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش و درآمد، هزینه</div>
                              </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showSale"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_close"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">فروش</div>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              tabindex="0"
                              @click="showCost"
                            >
                              <div class="q-py-sm">
                                <q-item-section avatar>
                                  <q-avatar
                                    class="dark-icon"
                                    size="sm"
                                  ><q-icon
                                      name="o_check"
                                      size="14px"
                                    /></q-avatar>
                                </q-item-section>
                              </div>
                              <q-item-section>
                                <div class="text-caption">هزینه</div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>

                      </q-btn>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="column q-gutter-y-sm q-px-lg q-py-lg">

                  <div class="text-body2">حاشیه سود</div>
                  <div class="row items-center q-gutter-x-sm">
                    <div class="text-body1 text-bold">(178,015.03) %</div>
                    <div class="text-body2 text-bold text-negative">-%4</div>
                  </div>
                </q-card-section>

              </q-card>
            </div>


          </div>

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
              <q-item-label class="text-body1 q-mb-xs">موجودی بانک</q-item-label>
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



</script>

<style lang="scss">
.gap-24 {
  gap: 24px;
}

.darkBGImg {
  background: $dark url("../../../../public/triangle-light.png") repeat-y left top;
}
</style>

