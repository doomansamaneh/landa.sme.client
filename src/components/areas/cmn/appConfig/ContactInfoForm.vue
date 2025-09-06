<template>
  <div>
    <location-lookup
      :label="$t('shared.labels.countryCity')"
      v-model:selectedId="
        configStore.model.value.companySetting.locationId
      "
      v-model:selectedText="
        configStore.model.value.companySetting.location
      "
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.columns.address')"
      v-model="configStore.model.value.companySetting.address"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.postalCode')"
      v-model="configStore.model.value.companySetting.postalCode"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.phone')"
      v-model="configStore.model.value.companySetting.phone"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.fax')"
      v-model="configStore.model.value.companySetting.fax"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      :label="$t('shared.labels.email')"
      v-model="configStore.model.value.companySetting.email"
    />
  </div>
</template>

<script setup>
  import { useAppConfigModel } from "../_composables/useAppConfigModel";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

  const configStore = useAppConfigModel();
</script>
