<template>
  <q-card flat bordered class="form-container" style="margin-top: 0">
    <div :class="$q.screen.gt.xs ? 'q-py-sm q-px-md' : 'q-pb-sm'">
      <div class="row items-center no-wrap">
        <div class="col">
          <div
            class="row items-center text-bold text-body1 no-letter-spacing"
          >
            <q-btn
              unelevated
              size="8px"
              class="q-mr-sm text-caption-sm no-pointer-events no-letter-spacing"
              round
              text-color="white"
              :class="`${itemPaymentType?.color}-gradient`"
            >
              <span class="text-body2 no-letter-spacing">
                {{ index + 1 }}
              </span>
            </q-btn>
            {{ $t(`shared.paymentMethod.${itemPaymentType.name}`) }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn
            size="11px"
            round
            flat
            @click="formStore.deleteRow(index)"
          >
            <q-icon size="22px" name="o_delete" />
          </q-btn>
        </div>
      </div>
    </div>

    <q-separator size="0.5px" :class="{ 'q-mb-md': $q.screen.xs }" />

    <q-card-section>
      <payment-item-cash
        v-if="item.typeId === paymentMethod.cash?.id"
        v-model="paymentMethod"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
      <payment-item-check
        v-if="item.typeId === paymentMethod.check?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
      <payment-item-check-spent
        v-if="item.typeId === paymentMethod.checkSpent?.id"
        v-model="paymentMethod"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
      <payment-item-transfer-bank
        v-if="item.typeId === paymentMethod.bankTransition?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
      <payment-item-pos
        v-if="item.typeId === paymentMethod.pos?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
      <payment-item-customer
        v-if="item.typeId === paymentMethod.customer?.id"
        :autofocus="index === formStore.newAddedItemIndex.value"
        :item="item"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { paymentMethod } from "src/constants";
  import { useReceiptModel } from "../../../_composables/useReceiptModel";

  import PaymentItemCash from "./PaymentItemCash.vue";
  import PaymentItemCheck from "./PaymentItemCheck.vue";
  import PaymentItemCheckSpent from "./PaymentItemCheckSpent.vue";
  import PaymentItemCustomer from "./PaymentItemCustomer.vue";
  import PaymentItemTransferBank from "./PaymentItemTransferBank.vue";
  import PaymentItemPos from "./PaymentItemPos.vue";

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
</script>
