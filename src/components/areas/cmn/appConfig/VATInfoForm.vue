<template>
  <div class="row q-col-gutter-md">
    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          label="شناسه ملی"
          v-model="configStore.model.value.companySetting.nationalNo"
        />
      </div>
    </div>

    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          label="شناسه اقتصادی"
          v-model="configStore.model.value.companySetting.taxNo"
        />
      </div>
    </div>
  </div>

  <div class="q-mt-lg text-body1 text-weight-600">
    تنظمیات سامانه مودیان مالیاتی
  </div>

  <q-separator spaced />

  <div class="q-mt-lg">
    <custom-input
      label="شناسه حافظه مالیاتی"
      v-model="
        configStore.model.value.companySetting.taxApiSetting.clientId
      "
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      label="کلید خصوصی"
      type="textarea"
      v-model="
        configStore.model.value.companySetting.taxApiSetting
          .privateKey
      "
    />
  </div>

  <div class="q-mt-lg">
    <custom-select
      label="نوع"
      :options="
        helper.getEnumOptions(taxApiInvoiceType, 'taxApiInvoiceType')
      "
      v-model="
        configStore.model.value.companySetting.taxApiSetting
          .invoiceType
      "
    />
  </div>
  <div class="q-mt-lg">
    <custom-select
      label="الگوی صورتحساب"
      :options="
        helper.getEnumOptions(
          taxApiInvoicePattern,
          'taxApiInvoicePattern'
        )
      "
      v-model="
        configStore.model.value.companySetting.taxApiSetting
          .invoicePattern
      "
    />
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";
  import {
    taxApiInvoicePattern,
    taxApiInvoiceType,
  } from "src/constants";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const configStore = useAppConfigModel();
</script>
