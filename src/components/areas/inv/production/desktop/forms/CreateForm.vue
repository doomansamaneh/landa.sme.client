<template>
  <master-section :form-store="formStore" />
  <production-items :form-store="formStore" class="q-mt-md" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import ProductionItems from "./v1/ProductionItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
