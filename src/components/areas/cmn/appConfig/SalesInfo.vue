<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
    class="form-container"
  >
    <q-card-section class="q-pa-lg">
      <div>
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          ارز
        </q-item-label>
        <currency-lookup
          v-model:selectedId="
            configStore.model.value.companySetting.defaultCurrencyId
          "
          v-model:selectedText="
            configStore.model.value.companySetting.defaultCurrencyTitle
          "
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          عنوان فاکتور در چاپ
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.invoiceTitle"
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          الگوی چاپ فاکتور، پیش‌فاکتور
        </q-item-label>
        <custom-select
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
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          روش محاسبه بهای تمام شده
        </q-item-label>
        <custom-select
          :options="helper.getEnumOptions(cogsCalcMethod, 'cogsCalcMethod')"
          v-model="configStore.model.value.companySetting.cogsMethod"
        />
      </div>

      <!-- <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          حاشیه بالای کاغذ در چاپ
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.printTopMargin"
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
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
            class="text-body2 no-letter-spacing"
            size="46px"
            label="امکان تعیین مبلغ مالیات بر ارزش افزوده در ثبت فاکتور فروش"
            v-model="configStore.model.value.companySetting.invoiceVatAmount"
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="ستون تخفیف را در هنگام چاپ نشان نده"
            v-model="
              configStore.model.value.companySetting.hideDiscountInInvoice
            "
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="مانده فاکتورهای مشتری را در چاپ فاکتور نشان بده"
            v-model="
              configStore.model.value.companySetting.showRemainedInInvoice
            "
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="فیلد قرارداد را در فرمهای فروش و سند نشان بده"
            v-model="configStore.model.value.companySetting.showContract"
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="این کسب و کار دارای چندین انبار است"
            v-model="configStore.model.value.companySetting.multiWarehouse"
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="از فروش کالاهای با موجودی منفی جلوگیری کن"
            v-model="
              configStore.model.value.companySetting.preventNegativeSales
            "
          />
          <q-checkbox
            dense
            class="text-body2 no-letter-spacing"
            size="46px"
            label="بازاریاب را در فرمهای فروش نشان بده"
            v-model="configStore.model.value.companySetting.showMarketer"
          />

          <div class="q-ml-xl">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              درصد بازاریابی
            </q-item-label>
            <custom-input
              type="number"
              v-model="configStore.model.value.companySetting.marketingPercent"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          شرح فاکتور
        </q-item-label>
        <custom-input
          type="textarea"
          v-model="configStore.model.value.companySetting.invoiceComment"
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          شرح پیش فاکتور
        </q-item-label>
        <custom-input
          type="textarea"
          v-model="configStore.model.value.companySetting.quoteComment"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useAppConfigModel } from "../_composables/useAppConfigModel";
import { helper } from "src/helpers";
import { invoicePreviewTemplate, cogsCalcMethod } from "src/constants";

import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import CurrencyLookup from "src/components/shared/lookups/CurrencyLookup.vue";

const configStore = useAppConfigModel();
console.log(configStore.model.value);
</script>
<style>
.settings-card {
  width: 900px;
}
</style>
