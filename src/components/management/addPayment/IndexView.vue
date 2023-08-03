<template>
  <q-card class="card-desktop gt-xs no-shadow q-my-xl">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-bold text-subtitle1">{{
          $t("page.renew-subscription.title")
        }}</q-item-label>
        <q-item-label class="dark-2 q-pt-xs" caption>
          {{ $t("page.renew-subscription.caption") }}
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
            <q-tooltip class="custom-tooltip">{{
              $t("page.buttons.back")
            }}</q-tooltip>
          </q-icon>
        </div>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-item class="q-px-lg column q-mb-md">
      <q-form @submit="onSubmit">
        <div class="row items-center">
          <div class="col-2 q-my-lg">
            <q-item-label>{{
              $t("page.renew-subscription.business-name-label")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="text-bold q-pl-xs">{{
              $route.params.businessTitle
            }}</span>
          </div>
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.current-plan")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">{{ $route.params.planTitle }}</span>
          </div>
          <div class="col-2 q-my-lg">
            <q-item-label>{{
              $t("page.renew-subscription.to-date")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">1403/03/23</span>
          </div>
          <div class="col-2">
            <q-item-label class="required-label"
              ><span>{{
                $t("page.renew-subscription.plan")
              }}</span></q-item-label
            >
          </div>
          <div class="row col-10">
            <plan-lookup @plan-selected="onPlanSelected" />
            <!-- <contact-lookup> </contact-lookup> -->
          </div>
          <div class="col-2 required-label">
            <q-item-label>{{
              $t("page.renew-subscription.extension-period")
            }}</q-item-label>
          </div>
          <div class="row col-10">
            <q-select
              hide-dropdown-icon
              v-model="periodSelected"
              :options="period"
              option-value="value"
              option-label="label"
              dense
              required
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'پر کردن این فیلد الزامی است'
              ]"
              outlined
              auto-close
              class="period-select"
              use-chips
            >
              <template #append>
                <q-icon
                  name="o_expand_more"
                  class="show-lookup-icon cursor-pointer"
                  size="sm"
                />
              </template>
            </q-select>
            <p>{{ periodSelected }}</p>
          </div>
          <div
            class="total glass row q-mt-lg q-mb-md full-width justify-between items-center q-px-xl"
          >
            <div class="row col-6 q-gutter-y-lg">
              <div class="col-7">
                <span>{{
                  $t("page.renew-subscription.loyalty-discount")
                }}</span>
              </div>
              <div class="col-4">
                <span>{{ loyaltyDiscount.toLocaleString() }}</span>
              </div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.total") }}</span>
              </div>
              <div class="col-4">
                <span>{{ subTotal }}</span>
              </div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.discount") }}</span>
              </div>
              <div class="col-4">
                <span>{{ discount.toLocaleString() }}</span>
              </div>
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.sum-total") }}</span>
              </div>
              <div class="col-4">
                <span class="text-bold">{{ total.toLocaleString() }}</span>
              </div>
            </div>
            <div class="sadad col-6 row justify-center items-center">
              <div class="row justify-center q-gutter-x-md">
                <q-radio
                  v-model="shape"
                  checked-icon="task_alt"
                  val="line"
                  color=""
                  size="md"
                >
                  <q-tooltip class="custom-tooltip text-body1">
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
            type="submit"
            unelevated
            rounded
            color="positive"
            no-caps
            padding="8px 16px"
            class=""
            ><q-icon name="o_monetization_on" class="q-pr-xs" size="xs" />
            {{ $t("page.renew-subscription.buttons.payment") }}
          </q-btn>
          <span class="text-caption q-pl-md"
            >پرداخت از همه کارتهای شتاب امکان پذیر است. برای پرداخت باید رمز دوم
            کارت خود را فعال کرده باشید.</span
          >
        </div>
      </q-form>
    </q-item>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import DataView from "src/components/shared/DataView.vue"
import PlanLookup from "src/components/shared/Lookups/PlanLookup.vue"
// import ContactLookup from "src/components/shared/Lookups/ContactLookup.vue"
const route = useRoute()
const $q = useQuasar()
const lookup = ref(null)
const shape = ref("line")
const pagination = ref(null)
const period = ref([])
const periodSelected = ref(period.value[0])
const selectedPlan = ref(0)
let subTotal = ref(0)
let total = ref(0)
let loyaltyDiscount = ref(0)
let discount = ref(0)

function selectPeriod(item) {
  periodSelected.value = item
}

async function loadData() {
  let businessId = route.params.businessId
  await fetchWrapper
    .get(`business/GetMonths/${businessId}`)
    .then((response) => {
      handleMonthResponse(response.data.data)
      periodSelected.value = period.value[0]
    })

  let planId = "606d8e04-69ef-4520-8d0e-20673167d0e2"
  await fetchWrapper
    .get(`business/GetLoyalDiscount/${businessId}/${planId}`)
    .then((response) => {
      handleDiscountResponse(response.data.data)
    })
}

function handleMonthResponse(data) {
  period.value = data.map((item) => ({
    label: `${item.month} ماه${
      item.percent !== 0 ? ` (${item.percent} درصد تخفیف)` : ""
    }`,
    value: `${item.month}`
  }))

  // alert(`businessId:${route.params.businessId}`)
}

function handleDiscountResponse(data) {
  // alert("discount data has been loaded")
  console.log(`loyaltyDiscount: ${data}`)
  loyaltyDiscount.value = data
}

function sortColumn(columnName) {
  lookup.value.sortSelectedColumn(columnName)
}

onMounted(() => {
  loadData()
})

function onPlanSelected(item) {
  console.log(`Selected Plan cost: ${selectedPlan.value}`)
  selectedPlan.value = item.cost
}

watch(selectedPlan, (PlanCost) => {
  subTotal.value = PlanCost - loyaltyDiscount.value
  discount.value = 221276
  total.value = subTotal.value - discount.value
})

watch(periodSelected.value, (newValue) => {
  let periodMonth = newValue.value
  console.log(`Month: ${periodMonth}`)
})
</script>

<style lang="scss" scoped>
.card-desktop {
  width: 720px !important;
}

.period-select {
  width: 400px;
}

.total {
  border-radius: 4px;
  height: 300px;
}

th {
  padding: 24px 12px;
}

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
  background: #ffffff33;
  border-radius: 4px;
  box-shadow: 0 2px 20px #0000001a;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #ffffff4d;
}

.required-label {
  margin-bottom: 20px;
}
</style>
