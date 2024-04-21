<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section :class="padding()">
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              کد کارگاه
            </q-item-label>
            <custom-input
              v-model="configStore.model.value.companySetting.insuranceNo"
            />
          </div>
        </div>
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شعبه تامین اجتماعی
            </q-item-label>
            <custom-input
              v-model="
                configStore.model.value.companySetting.insuranceBranchName
              "
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg">
        <div>
          <q-item-label
            class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
          >
            شرح
          </q-item-label>
          <custom-input
            type="textarea"
            v-model="configStore.model.value.companySetting.insuranceComment"
          />
        </div>
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
