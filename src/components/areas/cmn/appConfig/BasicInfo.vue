<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section class="q-gutter-y-lg" :class="padding()">
      <div>
        <custom-input
          label="نام"
          v-model="configStore.model.value.companySetting.name"
        />
      </div>

      <div>
        <custom-input
          label="نام مسئول یا مدیر"
          v-model="configStore.model.value.companySetting.managerName"
        />
      </div>
      <div>
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
      <div>
        <custom-input
          label="محل ثبت"
          v-model="configStore.model.value.companySetting.location"
        />
      </div>
      <div>
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
      <div>
        <q-checkbox
          class="text-body2 no-letter-spacing"
          dense
          size="46px"
          label="شماره عطف را در چاپ سند حسابداری نشان بده"
          v-model="
            configStore.model.value.companySetting.showDocNoInVoucher
          "
        />
      </div>
    </q-card-section>

    <q-card-actions class="q-pb-lg q-px-lg q-mx-sm" align="right">
      <save-button />
    </q-card-actions>
  </div>
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

  const styles = () => {
    if (!props.inside && $q.screen.gt.sm) {
      return "q-card form-container settings-card";
    } else if (!props.inside) {
      return "q-card form-container";
    } else {
      return "";
    }
  };

  const padding = () => {
    if (props.inside) {
      return "no-padding";
    }
  };
</script>

<style>
  .settings-card {
    width: 900px;
  }
</style>
