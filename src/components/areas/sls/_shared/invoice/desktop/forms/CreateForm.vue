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
  import MasterSection from "./v1/MasterSection.vue";
  import DetailSection from "./v1/DetailSectionTable.vue";

  const props = defineProps({
    formStore: Object,
    model: Object,
    formType: Object,
  });
</script>
