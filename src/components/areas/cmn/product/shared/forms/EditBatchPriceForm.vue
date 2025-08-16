<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-lg">
      <div>
        <q-option-group
          :label="$t('shared.labels.typeTitle')"
          inline
          :options="
            helper.getEnumOptions(
              priceAdjustmentDirection,
              'priceAdjustmentDirection'
            )
          "
          type="radio"
          v-model="model.direction"
        />
      </div>
      <div>
        <custom-input-number
          v-model="model.percent"
          :label="$t('shared.labels.percentChange')"
        />
      </div>

      <div>
        <q-option-group
          :label="$t('shared.labels.price')"
          inline
          :options="
            helper.getEnumOptions(
              priceAdjustmentTarget,
              'priceAdjustmentTarget'
            )
          "
          type="radio"
          v-model="model.target"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";
  import {
    priceAdjustmentDirection,
    priceAdjustmentTarget,
  } from "src/constants";
  import { helper, bus, fetchWrapper } from "src/helpers";

  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    selectedIds: Array,
  });

  const form = ref(null);
  const $q = useQuasar();
  const { t } = useI18n();

  const model = ref({
    direction: priceAdjustmentDirection.increase,
    target: priceAdjustmentTarget.sales,
  });

  async function submitForm(callBack) {
    const isValid = await form.value.validate();

    if (isValid) {
      if (props.selectedIds?.length == 0)
        return $q.notify({
          type: "negative",
          message: t(`messages.noRowSelected`),
        });

      return fetchWrapper
        .post(`cmn/product/adjustPrice`, {
          selectedIds: props.selectedIds,
          adjustment: model.value,
        })
        .then((response) => {
          if (response?.data?.message)
            $q.notify({
              type: "positive",
              message: t(`messages.${response?.data?.message}`),
            });
          if (callBack) callBack(response);
          else bus.emit("apply-search");
        });
    }
  }

  defineExpose({
    submitForm,
  });
</script>
