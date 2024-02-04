<template>
  <div class="row" :class="{ 'q-col-gutter-md' : $q.screen.gt.xs}">

    <div class="col-md-8 col-sm-8 col-xs-12">
      <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">
        {{ $t("page.renew-subscription.plan") }}
      </q-item-label>
      <plan-lookup @row-selected="onPlanSelected" />
    </div>

    <div class="col-md col-sm col-xs-12">
      <div>
        <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">
          {{ $t("page.renew-subscription.extension-period") }}
        </q-item-label>
        <q-select
          hide-dropdown-icon
          dense
          v-model="selectedPeriod"
          @update:model-value="selectPeriod"
          :options="periodItems"
          outlined
          auto-close
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

  </div>

  <div class="total-container rounded-borders row q-mt-lg justify-between items-center" :class="{ 'q-px-xl' : $q.screen.gt.xs, 'q-px-lg' : $q.screen.lt.sm}">
    <div class="col-md-6 col-sm-6 col-xs-12 q-gutter-y-lg">
      <div
        class="row"
        v-if="loyaltyDiscountTotal > 0"
      >
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.loyalty-discount") }}</span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>{{ loyaltyDiscountTotal.toLocaleString() }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.total") }}</span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>{{ subTotal.toLocaleString() }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.discount") }}</span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>{{ discount.toLocaleString() }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.sum-total") }}</span>
        </div>
        <div class="col-md-5 col-sm col-xs">
          <span class="underline"><b>{{ total.toLocaleString() }}</b>
            {{ $t("page.add-business.rial") }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12 q-gutter-x-lg">
      <div class="row items-center">
        <q-radio
          v-model="shape"
          checked-icon="task_alt"
          val="line"
          color=""
          dense
          size="40px"
        >
          <q-tooltip class="custom-tooltip text-body1">
            <span class="sadad-tooltip">پرداخت تنها از طریق درگاه پرداخت الکترونیکی سداد امکان پذیر
              است</span>
          </q-tooltip>
        </q-radio>
        <div class="q-pa-md">
          <img
            src="/sadad-new.png"
            alt="درگاه پرداخت الکترونیک سداد"
            :class="$q.dark.isActive ? 'logo' : ''"
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
import PlanLookup from "src/components/shared/lookups/PlanLookup.vue"

const route = useRoute()
const lookup = ref(null)
const shape = ref("line")
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
    label: `${item.month} ماه${item.percent !== 0 ? ` (${item.percent} درصد تخفیف)` : ""
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
.logo {
  filter: brightness(0) invert(1);
}

.total-container {
  height: 300px;
  border: 1px solid $primary;
}

</style>
