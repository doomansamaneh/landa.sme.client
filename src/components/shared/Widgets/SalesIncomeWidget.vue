<template>
  <q-card
    class="fit bordered q-pa-none"
    flat
  >
    <q-card-section class="col q-pt-lg q-pb-none q-pl-lg q-pr-md">

      <div class="row justify-between">
        <div class="col-11">
          <q-item class="no-padding">
            <q-item-section avatar>
              <q-avatar
                v-if="saleIncome"
                rounded
                color="blue"
                text-color="white"
                icon="o_shopping_basket"
                size="md"
                class="blue-shadow"
              />

              <q-avatar
                v-if="saleIncomeTable"
                rounded
                color="blue"
                text-color="white"
                icon="o_table_chart"
                size="md"
                class="blue-shadow"
              />

              <q-avatar
                v-if="sale"
                rounded
                color="green"
                text-color="white"
                icon="o_sell"
                size="md"
                class="green-shadow"
              />

              <q-avatar
                v-if="cost"
                rounded
                color="red"
                text-color="white"
                icon="o_paid"
                size="md"
                class="orange-shadow"
              />
            </q-item-section>

            <q-item-section class="q-pl-xs">
              <q-item-label
                v-if="saleIncome"
                class="text-body1 q-mb-xs"
              >فروش و درآمد، هزینه</q-item-label>
              <q-item-label
                v-if="saleIncomeTable"
                class="text-body1 q-mb-xs"
              >جدول فروش و درآمد، هزینه</q-item-label>
              <q-item-label
                v-if="sale"
                class="text-body1 q-mb-xs"
              >فروش</q-item-label>
              <q-item-label
                v-if="cost"
                class="text-body1 q-mb-xs"
              >هزینه</q-item-label>
            </q-item-section>
          </q-item>

        </div>
        <div class="col">

          <div class="row justify-end">
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
                  style="width:240px"
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
                  <q-item
                    clickable
                    v-close-popup
                    tabindex="0"
                    @click="showSaleIncomeTable"
                  >
                    <div class="q-py-sm">
                      <q-item-section avatar>
                        <q-avatar
                          class="dark-icon"
                          size="sm"
                        >
                          <q-icon
                            name="o_table_chart"
                            size="14px"
                          />
                        </q-avatar>
                      </q-item-section>
                    </div>
                    <q-item-section>
                      <div class="text-caption">جدول فروش و درآمد، هزینه</div>
                    </q-item-section>
                  </q-item>
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
      </div>
    </q-card-section>

    <line-chart
      v-if="saleIncome"
      :height="300"
      legend="true"
    />

    <markup-table v-if="saleIncomeTable" />

    <bar-chart
      v-if="sale"
      :height="300"
      legend="false"
    />

    <bar-chart
      v-if="cost"
      :height="300"
      legend="false"
    />

  </q-card>
</template>

<script setup>
import { ref } from "vue"

import LineChart from 'src/components/shared/Charts/LineChart.vue'
import BarChart from 'src/components/shared/Charts/BarChart.vue'
import MarkupTable from 'src/components/shared/DataTables/MarkupTable.vue'

const saleIncome = ref(true)
const saleIncomeTable = ref(false)
const sale = ref(false)
const cost = ref(false)

const showSaleIncome = () => {
  saleIncome.value = true;
  saleIncomeTable.value = false;
  sale.value = false;
  cost.value = false
}

const showSaleIncomeTable = () => {
  saleIncomeTable.value = true;
  saleIncome.value = false;
  sale.value = false;
  cost.value = false
}

const showSale = () => {
  saleIncome.value = false;
  saleIncomeTable.value = false;
  cost.value = false;
  sale.value = true;
}

const showCost = () => {
  saleIncome.value = false;
  saleIncomeTable.value = false;
  sale.value = false;
  cost.value = true
}


</script>
