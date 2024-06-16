<template>
  <master-section :form-store="formStore" :form-type="formType" />
  <wage-items :form-store="formStore" :form-type="formType" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import WageItems from "./v1/WageItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
