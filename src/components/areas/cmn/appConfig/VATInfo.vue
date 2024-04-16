<template>
  <q-card
    :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
    style="margin-top: 0"
    class="form-container"
  >
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شناسه ملی
            </q-item-label>
            <custom-input
              v-model="configStore.model.value.companySetting.nationalNo"
            />
          </div>
        </div>

        <div class="col-md col-sm col-xs-12">
          <div>
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              شناسه اقتصادی
            </q-item-label>
            <custom-input
              v-model="configStore.model.value.companySetting.taxNo"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg text-body1 text-weight-600 no-letter-spacing">
        تنظمیات سامانه مودیان مالیاتی
      </div>

      <q-separator spaced />

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          شناسه حافظه مالیاتی
        </q-item-label>
        <custom-input
          v-model="
            configStore.model.value.companySetting.taxApiSetting.clientId
          "
        />
      </div>
      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          کلید خصوصی
        </q-item-label>
        <custom-input
          type="textarea"
          v-model="
            configStore.model.value.companySetting.taxApiSetting.privateKey
          "
        />
      </div>

      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          نوع
        </q-item-label>
        <custom-select
          :options="
            helper.getEnumOptions(taxApiInvoiceType, 'taxApiInvoiceType')
          "
          v-model="
            configStore.model.value.companySetting.taxApiSetting.invoiceType
          "
        />
      </div>
      <div class="q-mt-lg">
        <q-item-label
          class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
        >
          الگوی صورتحساب
        </q-item-label>
        <custom-select
          :options="
            helper.getEnumOptions(taxApiInvoicePattern, 'taxApiInvoicePattern')
          "
          v-model="
            configStore.model.value.companySetting.taxApiSetting.invoicePattern
          "
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useAppConfigModel } from "../_composables/useAppConfigModel";
import { helper } from "src/helpers";
import { taxApiInvoicePattern, taxApiInvoiceType } from "src/constants";

import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

const configStore = useAppConfigModel();
</script>

<style lang="scss">
.settings-card {
  width: 900px;
}
</style>
