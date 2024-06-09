<template>
  <div class="q-gutter-x-xs">
    <q-btn
      v-for="(item, index) in helper.getEnumOptions(
        paymentMethod,
        'paymentMethod'
      )"
      :key="index"
      class="q-my-xl primary-shadow"
      rounded
      unelevated
      :color="`${item.value.color}`"
      @click="formStore.addRow(item)"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      {{ item.label }}
    </q-btn>
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
  import { paymentMethod } from "src/constants";

  import PaymentItem from "./PaymentItem.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
