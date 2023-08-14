<template>
  <q-card class="card-desktop no-shadow q-my-xl">
    <q-card-section>
      <q-item class="">
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("page.renew-subscription.title")
          }}</q-item-label>
          <q-item-label class="dark-2 text-subtitle2">
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
    </q-card-section>
    <q-separator />
    <q-form @submit="onSubmit">
      <q-card-section class="padding-x">
        <div class="row q-mb-lg items-center">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.business-name-label")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="text-bold q-pl-xs">{{ businessTitle }}</span>
          </div>
        </div>
        <div class="row q-mb-lg items-center">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.current-plan")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">{{ planTitle }}</span>
          </div>
        </div>
        <div class="row q-mb-lg">
          <div class="col-2">
            <q-item-label>{{
              $t("page.renew-subscription.to-date")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <span class="q-pl-xs">{{ toDate }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <q-item-label class="pt-md"
              ><span class="">{{
                $t("page.renew-subscription.plan")
              }}</span></q-item-label
            >
          </div>
          <div class="col-10">
            <plan-lookup @row-selected="onPlanSelected" />
          </div>
        </div>
        <div class="row">
          <div class="col-2">
            <q-item-label class="pt-md">{{
              $t("page.renew-subscription.extension-period")
            }}</q-item-label>
          </div>
          <div class="col-10">
            <q-select
              hide-dropdown-icon
              dense
              v-model="selectedPeriod"
              @update:model-value="selectPeriod"
              :options="periodItems"
              outlined
              auto-close
              class="period-select"
            >
              <template #append>
                <q-icon
                  name="o_expand_more"
                  class="show-lookup-icon cursor-pointer"
                  size="sm"
                />
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div
          class="total glass row q-mb-md justify-between items-center q-px-xl margin-md"
        >
          <div class="col-6 q-gutter-y-lg">
            <div class="row" v-if="loyaltyDiscountTotal > 0">
              <div class="col-7">
                <span>{{
                  $t("page.renew-subscription.loyalty-discount")
                }}</span>
              </div>
              <div class="col-5">
                <span>{{ loyaltyDiscountTotal.toLocaleString() }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.total") }}</span>
              </div>
              <div class="col-5">
                <span>{{ subTotal.toLocaleString() }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.discount") }}</span>
              </div>
              <div class="col-5">
                <span>{{ discount.toLocaleString() }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <span>{{ $t("page.renew-subscription.sum-total") }}</span>
              </div>
              <div class="col-5">
                <span class="underline"
                  ><b>{{ total.toLocaleString() }}</b> ریال
                </span>
              </div>
            </div>
          </div>
          <div class="col-6 q-gutter-x-lg">
            <div class="row">
              <q-radio
                v-model="shape"
                checked-icon="task_alt"
                val="line"
                color=""
                size="md"
              >
                <q-tooltip class="custom-tooltip text-body1">
                  <span class="sadad-tooltip"
                    >پرداخت تنها از طریق درگاه پرداخت الکترونیکی سداد امکان پذیر
                    است</span
                  >
                </q-tooltip>
              </q-radio>
              <div class="q-pa-md">
                <img
                  src="../../../../public/sadad-new.png"
                  alt="درگاه پرداخت الکترونیک سداد"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="pay dark-1">
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
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import DataView from "src/components/shared/DataView.vue"
import PlanLookup from "src/components/shared/Lookups/PlanLookup.vue"

const route = useRoute()
const $q = useQuasar()
const lookup = ref(null)
const shape = ref("line")
const pagination = ref(null)
const periodItems = ref([])
const selectedPeriod = ref(periodItems.value[0])
const selectedPlan = ref(null)
const subTotal = ref(0)
const total = ref(0)
const loyaltyDiscount = ref(0)
const loyaltyDiscountTotal = ref(0)
const discount = ref(0)
const planTitle = ref(null)
const businessTitle = ref(null)
const toDate = ref(null)

async function loadData() {
  const businessId = route.params.businessId
  await fetchWrapper
    .get(`business/GetMonths/${businessId}`)
    .then((response) => {
      handleMonthResponse(response.data.data)
    })

  await fetchWrapper
    .get(`business/GetBusiness/${businessId}`)
    .then((response) => {
      handleBusinessData(response.data.data)
    })
}

async function getLoyalDiscount(planId) {
  const businessId = route.params.businessId
  await fetchWrapper
    .get(`business/GetLoyalDiscount/${businessId}/${planId}`)
    .then((response) => {
      handleDiscountResponse(response.data.data)
    })
}

function handleMonthResponse(data) {
  periodItems.value = data.map((item) => ({
    id: item.id,
    label: `${item.month} ماه${
      item.percent !== 0 ? ` (${item.percent} درصد تخفیف)` : ""
    }`,
    month: `${item.month}`,
    discountPercent: item.percent
  }))
  selectedPeriod.value = periodItems.value[0]
}

function handleBusinessData(data) {
  planTitle.value = data.lastPayment.planTitle
  businessTitle.value = data.title
  toDate.value = data.lastPayment.toDateString
}

function handleDiscountResponse(data) {
  loyaltyDiscount.value = data
}

onMounted(() => {
  loadData()
})

function sortColumn(columnName) {
  lookup.value.sortSelectedColumn(columnName)
}

async function onPlanSelected(plan) {
  selectedPlan.value = plan
  if (plan != null) await getLoyalDiscount(plan.id)
  computeValues()
}

async function selectPeriod(item) {
  selectedPeriod.value = item
  computeValues()
}

function computeValues() {
  if (selectedPlan.value == null) resetValues()
  else {
    loyaltyDiscountTotal.value =
      loyaltyDiscount.value * selectedPeriod.value.month
    const planCost = selectedPlan.value.cost
    const selectedPercent = selectedPeriod.value.discountPercent

    subTotal.value =
      planCost * selectedPeriod.value.month - loyaltyDiscountTotal.value

    discount.value = Math.round((subTotal.value * selectedPercent) / 100)
    total.value = Math.round(subTotal.value - discount.value)
  }
}

function resetValues() {
  loyaltyDiscountTotal.value = discount.value = total.value = subTotal.value = 0
}
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

.q-card__section--vert {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.padding-x {
  padding: 24px 36px;
}

.pt-md {
  padding-top: 12px;
}

.margin-md {
  margin: 0 20px 12px 20px;
}
</style>
