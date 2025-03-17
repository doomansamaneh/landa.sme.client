<template>
  <q-card>
    <q-card-section :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-pa-md'">
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
    </q-card-section>

    <save-button />
  </q-card>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import SaveButton from "./_SaveSettingButton.vue";

  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();
  const configStore = useAppConfigModel();
</script>
