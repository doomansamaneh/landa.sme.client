<template>
  <q-card flat bordered class="form-container" style="margin-top: 0">
    <div :class="$q.screen.gt.xs ? 'q-py-sm q-px-md' : 'q-py-md'">
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
              :class="`${item.color}-gradient`"
            >
              <span class="text-body2 no-letter-spacing">
                {{ index + 1 }}
              </span>
            </q-btn>
            {{ item.header }}
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
        v-if="item.typeId == paymentMethod.cash?.id"
        v-model="paymentMethod"
        :item="item"
      />
      <payment-item-check
        v-if="item.typeId == paymentMethod.check?.id"
        :item="item"
      />
      <payment-item-transfer-bank
        v-if="item.typeId == paymentMethod.bankTransition?.id"
        :item="item"
      />
      <payment-item-pos
        v-if="item.typeId == paymentMethod.pos?.id"
        :item="item"
      />
      <payment-item-customer
        v-if="item.typeId == paymentMethod.customer?.id"
        :item="item"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { paymentMethod } from "src/constants";

  import PaymentItemCash from "./PaymentItemCash.vue";
  import PaymentItemCheck from "./PaymentItemCheck.vue";
  import PaymentItemCustomer from "./PaymentItemCustomer.vue";
  import PaymentItemTransferBank from "./PaymentItemTransferBank.vue";
  import PaymentItemPos from "./PaymentItemPos.vue";

  const props = defineProps({
    item: Object,
    index: Number,
    formStore: Object,
  });
</script>
