<template>
  <master-section :form-store="formStore" />
  <voucher-items :form-store="formStore" class="q-mt-md" />
</template>

<script setup>
  import MasterSection from "./MasterSection.vue";
  import VoucherItems from "./VoucherItems.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
