<template>
  <custom-input
    label="عنوان فاکتور در چاپ"
    v-model="configStore.model.value.companySetting.invoiceTitle"
  />

  <div class="q-mt-lg">
    <custom-select
      label="الگوی چاپ فاکتور، پیش‌فاکتور"
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
      label="روش محاسبه بهای تمام شده"
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
        label="امکان تعیین مبلغ مالیات بر ارزش افزوده در ثبت فاکتور فروش"
        v-model="
          configStore.model.value.companySetting.invoiceVatAmount
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="ستون تخفیف را در هنگام چاپ نشان نده"
        v-model="
          configStore.model.value.companySetting.hideDiscountInInvoice
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="مانده فاکتورهای مشتری را در چاپ فاکتور نشان بده"
        v-model="
          configStore.model.value.companySetting.showRemainedInInvoice
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="فیلد قرارداد را در فرمهای فروش و سند نشان بده"
        v-model="configStore.model.value.companySetting.showContract"
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="این کسب و کار دارای چندین انبار است"
        v-model="
          configStore.model.value.companySetting.multiWarehouse
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="از فروش کالاهای با موجودی منفی جلوگیری کن"
        v-model="
          configStore.model.value.companySetting.preventNegativeSales
        "
      />
      <q-checkbox
        dense
        class="text-body2"
        size="46px"
        label="بازاریاب را در فرمهای فروش نشان بده"
        v-model="configStore.model.value.companySetting.showMarketer"
      />

      <div>
        <custom-input
          label="درصد بازاریابی"
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
      label="شرح فاکتور"
      type="textarea"
      v-model="configStore.model.value.companySetting.invoiceComment"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      label="شرح پیش فاکتور"
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
