<template>
  <div class="row q-col-gutter-md">
    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          :label="$t('shared.labels.nationalNo')"
          v-model="configStore.model.value.companySetting.nationalNo"
        />
      </div>
    </div>

    <div class="col-md col-sm col-xs-12">
      <div>
        <custom-input
          :label="$t('shared.labels.economicId')"
          v-model="configStore.model.value.companySetting.taxNo"
        />
      </div>
    </div>
  </div>

  <div class="q-mt-lg text-body1 text-weight-600">
    {{ $t("shared.labels.taxSystemSettings") }}
  </div>

  <q-separator spaced />

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.taxMemoryId')"
      v-model="
        configStore.model.value.companySetting.taxApiSetting.clientId
      "
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.privateKey')"
      type="textarea"
      v-model="
        configStore.model.value.companySetting.taxApiSetting
          .privateKey
      "
    />
  </div>

  <div class="q-mt-lg">
    <custom-select
      :label="$t('shared.labels.typeTitle')"
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
      :label="$t('shared.labels.invoicePattern')"
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
