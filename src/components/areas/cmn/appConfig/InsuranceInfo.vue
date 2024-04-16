<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
    class="form-container border-radius-lg"
  >
    <q-card-section>
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
  </q-card>
</template>

<script setup>
import { useAppConfigModel } from "../_composables/useAppConfigModel";
import CustomInput from "src/components/shared/forms/CustomInput.vue";

const configStore = useAppConfigModel();
</script>

<style>
.settings-card {
  width: 900px;
}
</style>
