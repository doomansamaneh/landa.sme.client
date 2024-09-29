<template>
  <master-section :form-store="formStore" />
  <div class="q-mt-md">
    <detail-section :form-store="formStore" />
  </div>
</template>

<script setup>
  import MasterSection from "../../desktop/forms/MasterSection.vue";
  import DetailSection from "../../desktop/forms/VoucherItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
