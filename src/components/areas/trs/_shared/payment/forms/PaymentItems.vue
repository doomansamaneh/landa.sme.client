<template>
  <div class="row items-center q-gutter-sm q-py-lg">
    <template
      v-for="(item, index) in helper.getEnumOptions(
        paymentMethod,
        'paymentMethod'
      )"
      :key="index"
    >
      <q-btn
        v-if="
          (item.value.id === paymentMethod.checkSpent.id &&
            paymentReceiptType === paymentOrReceipt.payment) ||
          item.value.id !== paymentMethod.checkSpent.id
        "
        :class="`${item.value.color}-shadow ${item.value.color}-gradient`"
        text-color="white"
        rounded
        unelevated
        @click="formStore.addRow(item)"
      >
        <q-icon name="o_add" size="20px" class="q-mr-xs" />
        {{ item.label }}
      </q-btn>
    </template>
  </div>

  <payment-item
    v-for="(item, index) in formStore.model.value.paymentItems"
    :key="index"
    :item="item"
    :index="index"
    :form-store="formStore"
    class="q-mb-md"
  />
</template>

<script setup>
  import { helper } from "src/helpers";
  import { paymentMethod, paymentOrReceipt } from "src/constants";
  import { useReceiptModel } from "../../../_composables/useReceiptModel";

  import PaymentItem from "./PaymentItem.vue";

  const props = defineProps({
    formStore: useReceiptModel,
    paymentReceiptType: paymentOrReceipt,
  });
</script>
