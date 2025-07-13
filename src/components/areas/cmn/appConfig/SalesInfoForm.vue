<template>
  <custom-input
    :label="$t('shared.labels.invoiceTitleInPrint')"
    v-model="configStore.model.value.companySetting.invoiceTitle"
  />

  <div class="q-mt-lg">
    <custom-select
      :label="$t('shared.labels.invoicePrintTemplate')"
      :options="
        helper.getEnumOptions(
          invoicePreviewTemplate,
          'invoicePreviewTemplate'
        )
      "
      v-model="configStore.model.value.companySetting.invoiceTemplate"
    />
  </div>

  <div class="q-mt-lg">
    <custom-select
      :label="$t('shared.labels.cogsCalculationMethod')"
      :options="
        helper.getEnumOptions(cogsCalcMethod, 'cogsCalcMethod')
      "
      v-model="configStore.model.value.companySetting.cogsMethod"
    />
  </div>

  <!-- <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark  text-body2 q-mb-sm"
        >
          حاشیه بالای کاغذ در چاپ
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.printTopMargin"
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark  text-body2 q-mb-sm"
        >
          حاشیه پایین کاغذ در چاپ
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.printBottomMargin"
        />
      </div> -->

  <div class="q-mt-lg">
    <div class="column q-col-gutter-md">
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.allowVatAmountInSalesInvoice')"
        v-model="
          configStore.model.value.companySetting.invoiceVatAmount
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.hideDiscountColumnInPrint')"
        v-model="
          configStore.model.value.companySetting.hideDiscountInInvoice
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.showCustomerBalanceInInvoice')"
        v-model="
          configStore.model.value.companySetting.showRemainedInInvoice
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.showContractInSalesForms')"
        v-model="configStore.model.value.companySetting.showContract"
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.multiWarehouseBusiness')"
        v-model="
          configStore.model.value.companySetting.multiWarehouse
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.preventNegativeStockSales')"
        v-model="
          configStore.model.value.companySetting.preventNegativeSales
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        :label="$t('shared.labels.showMarketerInSalesForms')"
        v-model="configStore.model.value.companySetting.showMarketer"
      />

      <div>
        <custom-input
          :label="$t('shared.labels.marketingPercentage')"
          type="number"
          v-model="
            configStore.model.value.companySetting.marketingPercent
          "
        />
      </div>
    </div>
  </div>

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.invoiceDescription')"
      type="textarea"
      v-model="configStore.model.value.companySetting.invoiceComment"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.quoteDescription')"
      type="textarea"
      v-model="configStore.model.value.companySetting.quoteComment"
    />
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";
  import {
    invoicePreviewTemplate,
    cogsCalcMethod,
  } from "src/constants";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const configStore = useAppConfigModel();
</script>
