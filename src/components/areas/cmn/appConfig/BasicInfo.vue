<template>
  <q-card
    style="margin-top: 0"
    class="form-container"
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
  >
    <q-card-section class="q-gutter-y-lg">
      <div>
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          نام
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.name" />
      </div>

      <div>
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          نام مسئول یا مدیر
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.managerName"
        />
      </div>
      <div>
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          موضوع
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.subject"
        />
      </div>
      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          شماره ثبت
        </q-item-label>
        <custom-input v-model="configStore.model.value.companySetting.regNo" />
      </div>
      <div>
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          محل ثبت
        </q-item-label>
        <custom-input
          v-model="configStore.model.value.companySetting.location"
        />
      </div>
      <div>
        <q-checkbox
          class="text-body2 no-letter-spacing"
          size="46px"
          label="شماره عطف را در چاپ سند حسابداری نشان بده"
          v-model="configStore.model.value.companySetting.showDocNoInVoucher"
        />
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
