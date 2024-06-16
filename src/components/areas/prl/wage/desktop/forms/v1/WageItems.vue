<template>
  <div v-if="formStore.model?.value?.wageItems?.length === 0">
    <q-btn
      class="q-my-xl primary-shadow"
      rounded
      unelevated
      color="primary"
      @click="formStore.pushNewRow()"
    >
      <q-icon name="o_add" size="20px" class="q-mr-xs" />
      افزودن ردیف
    </q-btn>
  </div>
  <template
    v-else
    v-for="(item, index) in formStore.model.value.wageItems"
    :key="index"
  >
    <wage-item
      class="q-my-md"
      :index="index"
      :item="item"
      :form-store="formStore"
    />
  </template>
</template>

<script setup>
  import WageItem from "./WageItem.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
