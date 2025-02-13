<template>
  <div style="margin-top: 0" :class="styles()">
    <q-card-section :class="padding()">
      <div class="row q-col-gutter-md">
        <div class="col-md col-sm col-xs-12">
          <div>
            <custom-input
              label="شناسه ملی"
              v-model="
                configStore.model.value.companySetting.nationalNo
              "
            />
          </div>
        </div>

        <div class="col-md col-sm col-xs-12">
          <div>
            <custom-input
              label="شناسه اقتصادی"
              v-model="configStore.model.value.companySetting.taxNo"
            />
          </div>
        </div>
      </div>

      <div class="q-mt-lg text-body1 text-weight-600">
        تنظمیات سامانه مودیان مالیاتی
      </div>

      <q-separator spaced />

      <div class="q-mt-lg">
        <custom-input
          label="شناسه حافظه مالیاتی"
          v-model="
            configStore.model.value.companySetting.taxApiSetting
              .clientId
          "
        />
      </div>
      <div class="q-mt-lg">
        <custom-input
          label="کلید خصوصی"
          type="textarea"
          v-model="
            configStore.model.value.companySetting.taxApiSetting
              .privateKey
          "
        />
      </div>

      <div class="q-mt-lg">
        <custom-select
          label="نوع"
          :options="
            helper.getEnumOptions(
              taxApiInvoiceType,
              'taxApiInvoiceType'
            )
          "
          v-model="
            configStore.model.value.companySetting.taxApiSetting
              .invoiceType
          "
        />
      </div>
      <div class="q-mt-lg">
        <custom-select
          label="الگوی صورتحساب"
          :options="
            helper.getEnumOptions(
              taxApiInvoicePattern,
              'taxApiInvoicePattern'
            )
          "
          v-model="
            configStore.model.value.companySetting.taxApiSetting
              .invoicePattern
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
  import { helper } from "src/helpers";
  import {
    taxApiInvoicePattern,
    taxApiInvoiceType,
  } from "src/constants";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
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

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
