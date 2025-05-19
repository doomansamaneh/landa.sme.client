<template>
  <q-card class="form-container" style="margin-top: 0">
    <div :class="$q.screen.gt.xs ? 'q-py-sm q-px-md' : 'q-pb-sm'">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="row items-center text-bold text-body1">
            <q-btn
              unelevated
              size="9px"
              class="q-mr-sm text-caption-sm no-pointer-events"
              round
              text-color="white"
              :class="`${itemPaymentType?.color}-gradient`"
            >
              <span class="text-body2">
                {{ index + 1 }}
              </span>
            </q-btn>
            {{ $t(`shared.paymentMethod.${itemPaymentType.name}`) }}
          </div>
        </div>

        <div class="col-auto">
          <delete-button
            :disable="formStore.isAddingItem"
            @click="confirmDelete"
          />
        </div>
      </div>
    </div>

    <q-separator :class="{ 'q-mb-md': $q.screen.xs }" />

    <q-card-section>
      <div v-if="hasValidationErrors" class="q-mb-md">
        <q-banner class="bg-red-1 text-red">
          <template v-slot:avatar>
            <q-icon name="warning" color="red" />
          </template>
          <div
            v-for="(error, field) in validationErrors"
            :key="field"
          >
            {{ error }}
          </div>
        </q-banner>
      </div>

      <payment-item-cash
        v-if="item.typeId === paymentMethod.cash?.id"
        v-model="paymentMethod"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
      <payment-item-check
        v-if="item.typeId === paymentMethod.check?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
      <payment-item-check-spent
        v-if="item.typeId === paymentMethod.checkSpent?.id"
        v-model="paymentMethod"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
      <payment-item-transfer-bank
        v-if="item.typeId === paymentMethod.bankTransition?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
      <payment-item-pos
        v-if="item.typeId === paymentMethod.pos?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
      <payment-item-customer
        v-if="item.typeId === paymentMethod.customer?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
        :error="validationErrors[item.typeId]"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { paymentMethod } from "src/constants";
  import { useReceiptModel } from "../../../_composables/useReceiptModel";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";

  import PaymentItemCash from "./PaymentItemCash.vue";
  import PaymentItemCheck from "./PaymentItemCheck.vue";
  import PaymentItemCheckSpent from "./PaymentItemCheckSpent.vue";
  import PaymentItemCustomer from "./PaymentItemCustomer.vue";
  import PaymentItemTransferBank from "./PaymentItemTransferBank.vue";
  import PaymentItemPos from "./PaymentItemPos.vue";
  import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";
  import DeleteButton from "src/components/shared/Buttons/DeleteButton.vue";

  const $q = useQuasar();
  const i18n = useI18n();
  const props = defineProps({
    item: Object,
    index: Number,
    formStore: useReceiptModel,
  });

  const itemPaymentType = computed(() => {
    const entry = Object.entries(paymentMethod).find(
      ([key, value]) => value.id === props.item.typeId
    );

    if (entry) {
      const [name, details] = entry;
      return { name, ...details };
    }

    return null;
  });

  const validationErrors = computed(() => {
    return props.formStore.validationErrors.value || {};
  });

  const hasValidationErrors = computed(() => {
    return Object.keys(validationErrors.value).length > 0;
  });

  const confirmDelete = () => {
    $q.dialog({
      component: ConfirmDialog,
      componentProps: {
        title: i18n.t("shared.labels.deleteConfirm"),
        message: `${i18n.t("shared.labels.deleteMessage")}.`,
        ok: i18n.t("shared.labels.delete"),
        okColor: "deep-orange-7",
      },
    }).onOk(() => {
      props.formStore.deleteRow(props.index);
    });
  };
</script>

<style lang="scss" scoped>
  .form-container {
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    }
  }
</style>
