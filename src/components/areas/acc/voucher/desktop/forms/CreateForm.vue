<template>
  <master-section :form-store="formStore" />
  <voucher-items :form-store="formStore" class="q-mt-md" />
</template>

<script setup>
  import MasterSection from "./v1/MasterSection.vue";
  import VoucherItems from "./v1/VoucherItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
