<template>
  <master-section :form-store="formStore" />
  <production-used-items :form-store="formStore" class="q-mt-md" />
  <production-costs :form-store="formStore" class="q-mt-md" />
  <production-items :form-store="formStore" class="q-mt-md" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import ProductionItems from "./v1/ProductionItems.vue";
  import ProductionUsedItems from "./v1/ProductionUsedItems.vue";
  import ProductionCosts from "./v1/ProductionCosts.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
