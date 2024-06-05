<template>
  <q-card flat bordered>
    <q-card-section :class="`bg-${item.color} text-white q-pa-sm`">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">
            {{ index + 1 }}- {{ item.header }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn
            color="grey-3"
            round
            flat
            icon="delete"
            @click="formStore.deleteRow(index)"
          ></q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator />

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
