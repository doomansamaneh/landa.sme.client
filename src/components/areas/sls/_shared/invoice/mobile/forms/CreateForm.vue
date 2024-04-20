<template>
  <master-section :form-store="formStore" />
  <div class="q-mt-md">
    <detail-section :form-store="formStore" />
  </div>
</template>

<script setup>
import MasterSection from "src/components/areas/sls/invoice/desktop/forms/v1/MasterSection.vue";
import DetailSection from "src/components/areas/sls/invoice/mobile/forms/v1/DetailSectionTable.vue";

const props = defineProps({
  formStore: Object,
});
</script>
