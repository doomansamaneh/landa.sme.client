<template>
  <div class="row items-center">
    <div class="col-2">
      <q-item-label class="q-mb-lg"
        ><span class="">{{
          $t("page.renew-subscription.plan")
        }}</span></q-item-label
      >
    </div>
    <div class="col-10">
      <plan-lookup @row-selected="onPlanSelected" />
    </div>
  </div>
  <div class="row items-center q-mb-lg">
    <div class="col-2">
      <q-item-label class="">{{
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

  <div
    class="total glass row q-mb-sm justify-between items-center q-px-xl margin-md"
  >
    <div class="col-6 q-gutter-y-lg">
      <div class="row" v-if="loyaltyDiscountTotal > 0">
        <div class="col-7">
          <span>{{ $t("page.renew-subscription.loyalty-discount") }}</span>
        </div>
        <div class="col-5">
          <span>{{ loyaltyDiscount.toLocaleString() }}</span>
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
            ><b>{{ total.toLocaleString() }}</b>
            {{ $t("page.add-business.rial") }}
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
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { fetchWrapper } from "src/helpers"
import PlanLookup from "src/components/shared/Lookups/PlanLookup.vue"

const route = useRoute()
const lookup = ref(null)
const shape = ref("line")
const pagination = ref(null)
const periodItems = ref([])
const selectedPeriod = ref(periodItems.value[0])
const selectedPlan = ref(null)

const total = ref(0)
const subTotal = ref(0)
const loyaltyDiscount = ref(0)
const loyaltyDiscountTotal = ref(0)
const discount = ref(0)

async function loadData() {
  let businessId = route.params.businessId
  if (!businessId) businessId = "00000000-0000-0000-0000-000000000000"
  await fetchWrapper
    .get(`business/GetMonths/${businessId}`)
    .then((response) => {
      handleMonthResponse(response.data.data)
    })
}

async function getLoyalDiscount(planId) {
  const businessId = route.params.businessId
  if (businessId)
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

onMounted(() => {
  loadData()
})

function handleDiscountResponse(data) {
  loyaltyDiscount.value = data
}

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
.period-select {
  width: 400px;
}

.total {
  border-radius: 4px;
  height: 300px;
}

.input {
  width: 400px;
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
</style>
