<template>
  <img src="src/assets/about-us-header.png" alt="" />
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-bold">تمدید سرویس</q-item-label>
        <q-item-label class="dark-2 q-pt-xs text-subtitle2" caption>
          همه هزینه ها به ریال می باشد
        </q-item-label>
      </q-item-section>
      <q-card-actions>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip class="custom-tooltip">بازگشت</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-item class="q-px-lg column q-mb-md">
      <q-form>
        <div class="row items-center">
          <div class="col-2 q-my-lg">
            <q-item-label>کسب و کار:</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs"
              >دومان سامانه برای تست و انجام کارهای دمو</span
            >
          </div>
          <div class="col-2">
            <q-item-label>طرح فعلی:</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs"
              >طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
              دستمزد)</span
            >
          </div>
          <div class="col-2 q-my-lg">
            <q-item-label>تا تاریخ:</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">1403/03/23</span>
          </div>
          <div class="col-2">
            <q-item-label>طرح (ریال):</q-item-label>
          </div>
          <div class="col-10">
            <q-btn-dropdown dense outline class="q-pl-md">
              <data-view
                ref="businessDataView"
                dataSource="business/getBusinessGridData"
                orderByField="title"
                searchField="b.title"
                @reload-data="reloadData"
                class="plan-title"
              >
                <template #item="{ item }">
                  <table class="plan-title-table text-left full-width">
                    <thead class="text-caption">
                      <tr>
                        <th class=""><span>#</span></th>
                        <th class=""><span>عنوان</span></th>
                        <th style=""><span>هزینه ماهانه</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ item.statusId }}</td>
                        <td>
                          <span>{{ item.planTitle }}</span>
                        </td>
                        <td>{{ item.daysToExpire }}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </data-view>
            </q-btn-dropdown>
          </div>
          <div class="col-2 q-my-lg">
            <q-item-label>دوره تمدید:</q-item-label>
          </div>
          <div class="col-10">
            <q-btn-dropdown
              dense
              outline
              :label="selectedPeriod"
              class="q-pl-md"
              auto-close
            >
              <q-item
                clickable
                v-for="item in period"
                :key="item"
                @click="selectPeriod(item)"
              >
                <q-item-section>{{ item }}</q-item-section>
              </q-item>
            </q-btn-dropdown>
          </div>
          <div
            class="total dark-container row q-py-xl q-my-md full-width items-center q-pl-lg"
          >
            <div class="col-2 q-my-md">
              <q-item-label>تخفیف وفاداری:</q-item-label>
            </div>
            <div class="col-10">
              <span class="q-pl-sm">0</span>
            </div>
            <div class="col-2 q-my-md">
              <q-item-label>جمع:</q-item-label>
            </div>
            <div class="col-10">
              <span class="q-pl-sm">{{ total }}</span>
            </div>
            <div class="col-2 q-my-md">
              <q-item-label>تخفیف:</q-item-label>
            </div>
            <div class="col-10">
              <span class="q-pl-sm">0</span>
            </div>
            <div class="col-2 q-my-md">
              <q-item-label>جمع کل:</q-item-label>
            </div>
            <div class="col-10">
              <span class="q-pl-sm text-bold">{{ total }}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center q-mt-sm">
          <q-btn
            unelevated
            color="positive"
            padding="8px 16px"
            class="text-bold"
            ><q-icon name="o_monetization_on" class="q-pr-xs" />
            پرداخت
          </q-btn>
          <span class="text-caption q-pl-lg"
            >پرداخت از همه کارتهای شتاب امکان پذیر است. برای پرداخت باید رمز دوم
            کارت خود را فعال کرده باشید.</span
          >
        </div>
      </q-form>
    </q-item>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue"
import DataView from "src/components/shared/DataView.vue"

const period = [
  "1 ماه",
  "3 ماه",
  "6 ماه (6 درصد تخفیف)",
  "12 ماه (15 درصد تخفیف)"
]
const selectedPeriod = ref(period[0])

function selectPeriod(item) {
  selectedPeriod.value = item
}
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 720px !important;
}

.total {
  border-radius: 4px;
}

th,
td {
  padding: 16px 16px;
}
</style>
