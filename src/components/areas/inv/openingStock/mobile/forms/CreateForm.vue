<template>
  <master-section :form-store="formStore" />
  <reposition-items :form-store="formStore" class="q-mt-md" />
  <payment-items :form-store="formStore" />
</template>

<script setup>
  import MasterSection from "../../shared/forms/MasterSection.vue";
  import RepositionItems from "./RepositionItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
