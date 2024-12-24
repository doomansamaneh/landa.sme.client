<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section :class="padding()">
      <div class="q-gutter-y-lg">
        <div>
          <custom-input
            label="کشور"
            v-model="configStore.model.value.companySetting.country"
          />
        </div>
        <div>
          <custom-input
            label="نشانی"
            v-model="configStore.model.value.companySetting.address"
          />
        </div>
        <div>
          <custom-input
            label="کد پستی"
            v-model="
              configStore.model.value.companySetting.postalCode
            "
          />
        </div>
        <div>
          <custom-input
            label="تلفن"
            v-model="configStore.model.value.companySetting.phone"
          />
        </div>
        <div>
          <custom-input
            label="نمابر"
            v-model="configStore.model.value.companySetting.fax"
          />
        </div>
        <div>
          <custom-input
            label="ایمیل"
            v-model="configStore.model.value.companySetting.email"
          />
        </div>
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

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import SaveButton from "./_SaveSettingButton.vue";

  const props = defineProps({
    inside: Boolean,
  });

  const $q = useQuasar();
  const configStore = useAppConfigModel();

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
