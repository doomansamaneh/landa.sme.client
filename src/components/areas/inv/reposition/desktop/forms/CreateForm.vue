<template>
  <master-section :form-store="formStore" />
  <reposition-items :form-store="formStore" class="q-mt-md" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import RepositionItems from "./v1/RepositionItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
