<template>
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
            <span class="text-bold q-pl-xs"
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
          <div class="row col-10">
            <div class="q-input-menu-wrapper col-5">
              <q-input outlined dense class="input" v-model="selectedPlan">
                <template #append>
                  <q-icon
                    name="clear"
                    size="16px"
                    color="primary"
                    v-if="selectedPlan && selectedPlan.length > 0"
                    class="cursor-pointer"
                    @click="clearSelection"
                  />
                  <q-icon
                    name="o_expand_more"
                    class="cursor-pointer"
                    size="sm"
                  />
                </template>
                <q-menu transition-show="jump-down" transition-hide="jump-up">
                  <lookup-view
                    ref="businessDataView"
                    dataSource="business/getBusinessGridData"
                    orderByField="title"
                    searchField="b.title"
                    @reload-data="reloadData"
                    class="lookup"
                    @selected-plan="selectCard()"
                    @keydown.enter="selectCard()"
                  >
                  </lookup-view>
                </q-menu>
              </q-input>
            </div>
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
            class="total glass row q-mt-lg q-mb-md full-width justify-between items-center q-px-xl"
          >
            <div class="row col-6 q-gutter-y-lg">
              <div class="col-7"><span>تخفیف وفاداری:</span></div>
              <div class="col-4"><span>36,000</span></div>
              <div class="col-7"><span>جمع:</span></div>
              <div class="col-4"><span>149,000</span></div>
              <div class="col-7"><span>تخفیف:</span></div>
              <div class="col-4"><span>0</span></div>
              <div class="col-7"><span>جمع کل:</span></div>
              <div class="col-4"><span class="text-bold">149,000</span></div>
            </div>
            <div class="sadad col-6 row justify-center items-center">
              <div class="row justify-center q-gutter-x-md">
                <q-radio
                  v-model="shape"
                  checked-icon="task_alt"
                  val="line"
                  color="dark"
                >
                  <q-tooltip class="text-body1">
                    <span class="sadad-tooltip"
                      >پرداخت تنها از طریق درگاه پرداخت الکترونیکی سداد امکان
                      پذیر است</span
                    >
                  </q-tooltip>
                </q-radio>
                <div class="">
                  <img
                    src="../../../../public/sadad-new.png"
                    alt="درگاه پرداخت الکترونیک سداد"
                  />
                </div>
              </div>
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
import LookupView from "src/components/shared/LookupView.vue"

const planTitle = ["طرح 1", "طرح 2", "طرح 3"]
const period = [
  "1 ماه",
  "3 ماه",
  "6 ماه (6 درصد تخفیف)",
  "12 ماه (15 درصد تخفیف)"
]

const shape = ref("line")
const selectedPeriod = ref(period[0])
const selectedPlan = ref("")

function selectPeriod(item) {
  selectedPeriod.value = item
}

function clearSelection() {
  selectedPlan.value = ""
}

function selectCard() {
  selectedPlan.value = planTitle
}

watch(selectedPlan, (newValue) => {
  console.log("Selected Plan:", newValue)
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 720px !important;
}

.total {
  border-radius: 4px;
  height: 300px;
}

th,
td {
  padding: 16px 16px;
}

table {
  border-collapse: collapse;
  border: none;
}

.input {
  width: 400px;
}

.selected-row {
  background-color: #f4fcd1 !important;
}

tbody tr:hover {
  background-color: #f3f3f3;
}

.sadad {
  border-radius: 4px;
}

.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
