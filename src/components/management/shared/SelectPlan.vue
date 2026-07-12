<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-8 col-sm-8 col-xs-12">
      <plan-lookup
        v-model:selectedId="model.planId"
        v-model:selectedText="model.planTitle"
        :label="$t('page.renew-subscription.plan')"
        required
        @row-selected="onPlanSelected"
      />
    </div>

    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-select
          :label="$t('page.renew-subscription.extension-period')"
          required
          :options="periodItems"
          @update:model-value="selectPeriod"
        />
      </div>
    </div>
  </div>

  <div
    class="total-container rounded-borders row q-mt-lg justify-between items-center"
    :class="{
      'q-pa-xl': $q.screen.gt.xs,
      'q-pa-lg': $q.screen.lt.sm,
    }"
  >
    <div class="col-md-6 col-sm-6 col-xs-12 q-gutter-y-lg">
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.total") }}</span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>
            {{ helper.formatNumber(subTotal + loyaltyDiscountTotal) }}
          </span>
        </div>
      </div>

      <div class="row" v-if="loyaltyDiscountTotal > 0">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>
            {{ $t("page.renew-subscription.loyalty-discount") }}
          </span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>{{ helper.formatNumber(loyaltyDiscountTotal) }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.discount") }}</span>
        </div>
        <div class="col-md col-sm col-xs">
          <span>{{ helper.formatNumber(discount) }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-3 col-xs-3">
          <span>{{ $t("page.renew-subscription.sum-total") }}</span>
        </div>
        <div class="col-md-5 col-sm col-xs">
          <span class="underline">
            <b>{{ helper.formatNumber(total) }}</b>
            {{ $t("page.add-business.rial") }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="col-md-6 col-sm-6 col-xs-12"
      :class="$q.screen.gt.xs ? '' : 'q-mt-lg'"
    >
      <div class="row items-center">
        <q-radio
          v-model="model.gatewayTypeId"
          checked-icon="task_alt"
          :val="ipgGateWayes.sadad"
          color=""
          dense
          size="40px"
        >
          <q-tooltip class="custom-tooltip text-body1">
            <span class="sadad-tooltip">
              پرداخت از طریق درگاه پرداخت الکترونیکی سداد
            </span>
          </q-tooltip>

          <div class="q-pa-md">
            <img
              src="/sadad-new.png"
              alt="درگاه پرداخت الکترونیک سداد"
              :class="$q.dark.isActive ? 'logo' : ''"
              style="width: 120px"
            />
          </div>
        </q-radio>
      </div>

      <div class="row items-center">
        <q-radio
          v-model="model.gatewayTypeId"
          checked-icon="task_alt"
          :val="ipgGateWayes.smartiz"
          color=""
          dense
          size="40px"
        >
          <q-tooltip class="custom-tooltip text-body1">
            <span class="sadad-tooltip">
              پرداخت از طریق اپلیکیشن پرداخت شهری
            </span>
          </q-tooltip>

          <div class="q-pa-md">
            <img
              src="/smartispay.png"
              alt="اپلیکیشن پرداخت شهری"
              :class="$q.dark.isActive ? 'logo' : ''"
              style="width: 120px"
            />
          </div>
        </q-radio>
      </div>

      <div class="row_items-center">
        <custom-input
          v-if="model.gatewayTypeId === ipgGateWayes.smartiz"
          v-model="model.paymentUserName"
          label="شماره مشتری در اسمارتیز"
          required
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { fetchWrapper, helper } from "src/helpers";
  import { guidEmpty, ipgGateWayes } from "src/constants/enums";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import PlanLookup from "src/components/shared/lookups/PlanLookup.vue";

  const props = defineProps({ model: Object });

  const route = useRoute();
  const periodItems = ref([]);
  const selectedPeriod = ref(periodItems.value[0]);
  const selectedPlan = ref(null);

  const total = ref(0);
  const subTotal = ref(0);
  const loyaltyDiscount = ref(0);
  const loyaltyDiscountTotal = ref(0);
  const discount = ref(0);

  function roundPrice(value) {
    return Math.round(value / 1000) * 1000;
  }

  async function loadData() {
    let businessId = route.params.businessId;
    if (!businessId) businessId = guidEmpty;

    const response = await fetchWrapper.get(
      `business/GetMonths/${businessId}`,
    );

    handleMonthResponse(response.data.data);
  }

  async function getLoyalDiscount(planId) {
    const businessId = route.params.businessId;

    if (!businessId) return 0;

    const response = await fetchWrapper.get(
      `business/GetLoyalDiscount/${businessId}/${planId}`,
    );

    return response.data.data ?? 0;
  }

  function handleMonthResponse(data) {
    periodItems.value = data.map((item) => ({
      id: item.id,
      label: `${item.month} ماه${
        item.percent !== 0 ? ` (${item.percent} درصد تخفیف)` : ""
      }`,
      month: item.month,
      discountPercent: item.percent,
    }));

    selectedPeriod.value = periodItems.value[0] ?? 0;
    props.model.month = selectedPeriod.value?.month;
  }

  async function onPlanSelected(plan) {
    selectedPlan.value = plan;

    if (!plan) {
      loyaltyDiscount.value = 0;
      resetValues();
      return;
    }

    const planId = plan.id;

    const discountValue = await getLoyalDiscount(planId);

    // اگر کاربر سریع پلن را عوض کرد
    if (selectedPlan.value?.id !== planId) return;

    loyaltyDiscount.value = discountValue;

    computeValues();
  }

  function selectPeriod(item) {
    selectedPeriod.value = item;
    props.model.month = item?.month;

    computeValues();
  }

  function computeValues() {
    if (!selectedPlan.value || !selectedPeriod.value) {
      resetValues();
      return;
    }

    const month = selectedPeriod.value.month;
    const periodDiscountPercent =
      selectedPeriod.value.discountPercent;
    const planCost = selectedPlan.value.cost;

    loyaltyDiscountTotal.value = roundPrice(
      loyaltyDiscount.value * month,
    );

    subTotal.value = roundPrice(
      planCost * month - loyaltyDiscountTotal.value,
    );

    discount.value = roundPrice(
      (subTotal.value * periodDiscountPercent) / 100,
    );

    total.value = roundPrice(subTotal.value - discount.value);
  }

  function resetValues() {
    loyaltyDiscountTotal.value = 0;
    subTotal.value = 0;
    discount.value = 0;
    total.value = 0;
  }

  onMounted(async () => {
    await loadData();
  });
</script>

<style lang="scss" scoped>
  .logo {
    filter: brightness(0) invert(1);
  }

  .total-container {
    border: 1px solid $primary;
  }
</style>
