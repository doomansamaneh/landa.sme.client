<template>
  <q-card>
    <q-card-section :class="$q.screen.gt.xs ? 'q-pa-lg' : 'q-pa-md'">
      <custom-input
        label="نام"
        v-model="configStore.model.value.companySetting.name"
      />

      <div class="q-mt-lg">
        <custom-input
          label="نام مسئول یا مدیر"
          v-model="configStore.model.value.companySetting.managerName"
        />
      </div>

      <div class="q-mt-lg">
        <custom-input
          label="موضوع"
          v-model="configStore.model.value.companySetting.subject"
        />
      </div>

      <div class="q-mt-lg">
        <custom-input
          label="شماره ثبت"
          v-model="configStore.model.value.companySetting.regNo"
        />
      </div>

      <div class="q-mt-lg">
        <custom-input
          class="q-mt-lg"
          label="محل ثبت"
          v-model="configStore.model.value.companySetting.location"
        />
      </div>

      <div class="q-mt-lg">
        <currency-lookup
          label="ارز"
          v-model:selectedId="
            configStore.model.value.companySetting.defaultCurrencyId
          "
          v-model:selectedText="
            configStore.model.value.companySetting
              .defaultCurrencyTitle
          "
        />
      </div>
      <div class="q-mt-lg">
        <q-checkbox
          class="text-body2"
          dense
          size="46px"
          label="ش پیگیری را در چاپ سند حسابداری نشان بده"
          v-model="
            configStore.model.value.companySetting.showDocNoInVoucher
          "
        />
      </div>
    </q-card-section>

    <save-button />
  </q-card>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useAppConfigModel } from "../_composables/useAppConfigModel";

  import SaveButton from "./_SaveSettingButton.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CurrencyLookup from "src/components/shared/lookups/CurrencyLookup.vue";

  const $q = useQuasar();
  const configStore = useAppConfigModel();

  const props = defineProps({
    inside: Boolean,
  });
</script>
