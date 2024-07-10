<template>
  <create-or-edit :item="formStore.model.value.customerBusiness" />
</template>

<script setup>
  import CreateOrEdit from "../../../customerBusiness/shared/forms/_CreateOrEdit.vue";

  const props = defineProps({
    formStore: Object,
  });
</script>
