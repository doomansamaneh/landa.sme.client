<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
    class="form-container border-radius-lg"
  >
    <q-card-section>
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
            v-model="configStore.model.value.companySetting.postalCode"
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
          <custom-input v-model="configStore.model.value.companySetting.fax" />
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
