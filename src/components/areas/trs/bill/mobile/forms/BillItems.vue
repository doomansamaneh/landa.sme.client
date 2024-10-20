<template>
  <div
    v-if="formStore.model?.value?.billItems?.length === 0"
    class="text-center"
  >
    <q-btn
      class="q-my-xl primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.pushNewItem()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن هزینه
    </q-btn>
  </div>
  <template
    v-else
    v-for="(item, index) in formStore.model.value.billItems"
    :key="index"
  >
    <bill-item
      class="q-my-md"
      :index="index"
      :item="item"
      :form-store="formStore"
    />
  </template>
</template>

<script setup>
  import { useBillModel } from "../../../_composables/useBillModel";

  import BillItem from "./BillItem.vue";

  const props = defineProps({
    formStore: useBillModel,
  });
</script>
