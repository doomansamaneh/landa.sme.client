<template>
  <custom-input
    label="کشور"
    v-model="configStore.model.value.companySetting.country"
  />
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

  const configStore = useAppConfigModel();
</script>
