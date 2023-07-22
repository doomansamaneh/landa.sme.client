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
        <div class="flex q-gutter-x-sm q-mr-md"></div>
        <div class="flex items-center q-gutter-x-md q-pr-xs">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="o_refresh"
            @click="$emit('reload-data')"
          >
            <q-tooltip>{{ $t("page.buttons.reload-data") }}</q-tooltip>
          </q-icon>
        </div>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="icon-hover dark-3 cursor-pointer"
            size="xs"
            name="arrow_back"
            @click="$router.go(-1)"
          >
            <q-tooltip>بازگشت</q-tooltip>
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
            <q-btn-dropdown
              outline
              label="انتخاب طرح"
              class="full-width q-pl-md"
            >
              <table class="text-left full-width">
                <thead>
                  <tr>
                    <th class="xs-width"><span>#</span></th>
                    <th class="md-width"><span>عنوان</span></th>
                    <th style="lg-width"><span>هزینه ماهانه</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>طرح 1: (حسابداری، خرید و فروش، دریافت و پرداخت)</td>
                    <td>149000</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      طرح 2: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
                      دستمزد)
                    </td>
                    <td>149000</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      طرح 3: (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و
                      دستمزد، api)
                    </td>
                    <td>149000</td>
                  </tr>
                </tbody>
              </table>
            </q-btn-dropdown>
          </div>
          <div class="col-2 q-my-lg">
            <q-item-label>دوره تمدید:</q-item-label>
          </div>
          <div class="col-10">
            <q-select dense outlined v-model="periodModel" :options="period" />
          </div>
          <div
            class="total row bg-grey-4 q-py-xl q-my-md full-width items-center q-pl-lg"
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

const planTitleModel = ref(null)
const periodModel = ref("1 ماه")
const planTitle = [
  "طرح 1:  (حسابداری، خرید و فروش، دریافت و پرداخت)",
  "طرح 2:  (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و دستمزد)",
  "طرح 3:  (حسابداری، خرید و فروش، دریافت و پرداخت، حقوق و دستمزد، api)"
]
const period = [
  "1 ماه",
  "3 ماه",
  "6 ماه (6 درصد تخفیف)",
  "12 ماه (15 درصد تخفیف)"
]

// Reactive variables for storing selected values and total
const total = ref(0)

// Watch for changes in planTitleModel and periodModel and update the total
watch([planTitleModel, periodModel], ([selectedPlan, selectedPeriod]) => {
  // Convert the selected period to a numeric value (e.g., "1 ماه" => 1)
  const periodValue = parseInt(selectedPeriod.split(" ")[0], 10)

  // Calculate the total based on the selected plan and periodValue
  const selectedPlanIndex = planTitle.indexOf(selectedPlan)
  const planCosts = [140000, 160000, 190000] // Replace with actual costs based on plan index
  const planCost = planCosts[selectedPlanIndex] || 0 // Default to 0 if index not found

  // Calculate the total
  total.value = planCost * periodValue
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 720px !important;
}

.total {
  border-radius: 4px;
}

.plan-drop-down {
  width: 500px;
}

table {
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 4px;
  overflow: hidden;
}

th,
td {
  padding: 24px 8px;
}

tbody tr:hover {
  background-color: #f2f2f28a;
}

.xs-width {
  width: 8px;
}
.md-width {
  width: 16px;
}

.lg-width {
  width: 24px;
}
.xl-width {
  width: 32px;
}
</style>
