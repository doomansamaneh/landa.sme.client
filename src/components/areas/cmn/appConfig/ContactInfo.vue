<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section :class="padding()">
      <div class="q-gutter-y-lg">
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            کشور
          </q-item-label>
          <custom-input
            v-model="configStore.model.value.companySetting.country"
          />
        </div>
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            نشانی
          </q-item-label>
          <custom-input
            v-model="configStore.model.value.companySetting.address"
          />
        </div>
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            کد پستی
          </q-item-label>
          <custom-input
            v-model="
              configStore.model.value.companySetting.postalCode
            "
          />
        </div>
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            تلفن
          </q-item-label>
          <custom-input
            v-model="configStore.model.value.companySetting.phone"
          />
        </div>
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            نمابر
          </q-item-label>
          <custom-input
            v-model="configStore.model.value.companySetting.fax"
          />
        </div>
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            ایمیل
          </q-item-label>
          <custom-input
            v-model="configStore.model.value.companySetting.email"
          />
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="q-gutter-x-sm">
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
