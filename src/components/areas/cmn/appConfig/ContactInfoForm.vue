<template>
  <div class="q-mt-lg">
    <location-lookup
      label="کشور/شهر"
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
      label="نشانی"
      v-model="configStore.model.value.companySetting.address"
    />
  </div>

  <div class="q-mt-lg">
    <custom-input
      label="کد پستی"
      v-model="configStore.model.value.companySetting.postalCode"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      label="تلفن"
      v-model="configStore.model.value.companySetting.phone"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      label="نمابر"
      v-model="configStore.model.value.companySetting.fax"
    />
  </div>
  <div class="q-mt-lg">
    <custom-input
      label="ایمیل"
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
