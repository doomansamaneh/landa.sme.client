<template>
  <master-section
    :form-store="formStore"
    :model="model"
    :form-type="formType"
  />
  <div class="q-mt-md">
    <detail-section
      :form-store="formStore"
      :model="model"
      :form-type="formType"
    />
  </div>
</template>

<script setup>
  import MasterSection from "src/components/areas/sls/_shared/invoice/desktop/forms/v1/MasterSection.vue";
  import DetailSection from "src/components/areas/sls/_shared/invoice/mobile/forms/v1/DetailSectionTable.vue";

  const props = defineProps({
    formStore: Object,
    model: Object,
    formType: Object,
  });
</script>
