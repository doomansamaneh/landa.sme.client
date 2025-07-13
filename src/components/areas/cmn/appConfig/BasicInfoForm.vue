<template>
  <custom-input
    :label="$t('shared.labels.name')"
    v-model="configStore.model.value.companySetting.name"
  />

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.managerName')"
      v-model="configStore.model.value.companySetting.managerName"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.subject')"
      v-model="configStore.model.value.companySetting.subject"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.registrationNumber')"
      v-model="configStore.model.value.companySetting.regNo"
    />
  </div>

  <div class="q-mt-lg">
    <location-lookup
      :label="$t('shared.labels.registrationLocation')"
      v-model:selectedId="
        configStore.model.value.companySetting.countryId
      "
      v-model:selectedText="
        configStore.model.value.companySetting.country
      "
    />
  </div>

  <div class="q-mt-lg">
    <currency-lookup
      :label="$t('shared.labels.currencyTitle')"
      v-model:selectedId="
        configStore.model.value.companySetting.defaultCurrencyId
      "
      v-model:selectedText="
        configStore.model.value.companySetting.defaultCurrencyTitle
      "
    />
  </div>
  <div class="q-mt-lg">
    <q-checkbox
      class="text-body2"
      dense
      size="46px"
      :label="$t('shared.labels.showTrackingNumberInVoucher')"
      v-model="
        configStore.model.value.companySetting.showDocNoInVoucher
      "
    />
  </div>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CurrencyLookup from "src/components/shared/lookups/CurrencyLookup.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

  const configStore = useAppConfigModel();
</script>
