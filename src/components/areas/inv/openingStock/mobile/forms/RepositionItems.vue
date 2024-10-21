<template>
  <template
    v-for="(item, index) in formStore.model.value.repositionItems"
    :key="index"
  >
    <reposition-item
      class="q-my-md"
      :index="index"
      :item="item"
      :form-store="formStore"
    />
  </template>
</template>

<script setup>
  import { useRepositionModel } from "../../../_composables/useRepositionModel";

  import RepositionItem from "./RepositionItem.vue";

  const props = defineProps({
    formStore: useRepositionModel,
  });
</script>
