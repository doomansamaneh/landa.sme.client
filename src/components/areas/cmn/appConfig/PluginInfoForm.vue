<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-sm-6 col-xs-12">
      <customer-lookup
        v-model="
          configStore.model.value.companySetting.txtDefaultCustomerId
        "
        label="مشتری پیش‌فرض"
      />
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <vat-lookup
        v-model="
          configStore.model.value.companySetting.txtDefaultVatId
        "
        label="نوع ارزش افزوده"
      />
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <sale-type-lookup
        v-model:selectedId="
          configStore.model.value.companySetting.txtDefaultSaleTypeId
        "
        v-model:selectedText="
          configStore.model.value.companySetting
            .txtDefaultSaleTypeTitle
        "
        label="نوع فروش"
        :filter-expression="saleTypeFilter"
      />
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <sale-type-lookup
        v-model:selectedId="
          configStore.model.value.companySetting
            .txtDefaultPurchaseTypeId
        "
        v-model:selectedText="
          configStore.model.value.companySetting
            .txtDefaultPurchaseTypeTitle
        "
        label="نوع خرید"
        :filter-expression="purchaseTypeFilter"
      />
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <bank-account-lookup
        v-model="
          configStore.model.value.companySetting
            .txtDefaultBankAccountId
        "
        label="حساب بانکی پیش‌فرض"
      />
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <currency-lookup
        v-model="
          configStore.model.value.companySetting.txtDefaultCurrencyId
        "
        label="ارز پیش‌فرض"
      />
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <custom-input
        v-model="configStore.model.value.companySetting.txtAudience"
        label="Audience"
      />
    </div>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <custom-select
        v-model="configStore.model.value.companySetting.duration"
        label="مدت اعتبار"
        :options="durationOptions"
      />
    </div>

    <div class="col-md-6 col-sm-6 col-xs-12">
      <q-checkbox
        class="text-body2"
        dense
        size="46px"
        v-model="configStore.model.value.companySetting.isActive"
        label="فعال؟"
      />
    </div>

    <div class="col-12">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <custom-input
            v-model="configStore.model.value.companySetting.txtToken"
            label="Token"
            type="textarea"
          />
        </div>
        <div class="col-12">
          <q-btn
            unelevated
            label="generate"
            color="primary"
            class="q-mt-md"
            @click="generateToken"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { sqlOperator, vatType } from "src/constants";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import BankAccountLookup from "src/components/shared/lookups/BankAccountLookup.vue";
  import CurrencyLookup from "src/components/shared/lookups/CurrencyLookup.vue";
  import CustomInput from "src/components/shared/Forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const configStore = useAppConfigModel();

  const durationOptions = [
    { label: "1", value: 1 },
    { label: "3", value: 3 },
    { label: "6", value: 6 },
    { label: "12", value: 12 },
    { label: "24", value: 24 },
    { label: "36", value: 36 },
    { label: "100", value: 100 },
    { label: "1000", value: 1000 },
    { label: "3000", value: 3000 },
  ];

  const saleTypeFilter = [
    {
      fieldName: "isForSale",
      operator: sqlOperator.equal,
      value: vatType.sale,
    },
  ];

  const purchaseTypeFilter = [
    {
      fieldName: "isForSale",
      operator: sqlOperator.equal,
      value: vatType.purchase,
    },
  ];

  function generateToken() {}
</script>
