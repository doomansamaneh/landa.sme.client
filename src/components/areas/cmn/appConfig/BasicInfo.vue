<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section class="q-gutter-y-lg" :class="padding()">
      <div>
        <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
          نام
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.name" />
      </div>

      <div>
        <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
          نام مسئول یا مدیر
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.managerName" />
      </div>
      <div>
        <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
          موضوع
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.subject" />
      </div>
      <div class="q-mt-lg">
        <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
          شماره ثبت
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.regNo" />
      </div>
      <div>
        <q-item-label class="caption-on-dark no-letter-spacing text-body2 q-mb-sm">
          محل ثبت
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.location" />
      </div>
      <div>
        <q-checkbox class="text-body2 no-letter-spacing" dense size="46px" label="شماره عطف را در چاپ سند حسابداری نشان بده"
          v-model="configStore.model.value.companySetting.showDocNoInVoucher" />
      </div>
    </q-card-section>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAppConfigModel } from "../_composables/useAppConfigModel";

import CustomInput from "src/components/shared/forms/CustomInput.vue";

const $q = useQuasar()
const configStore = useAppConfigModel();

const props = defineProps({
  inside: Boolean
})

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
    return "no-padding"
  }
}
</script>

<style>
.settings-card {
  width: 900px;
}
</style>
