<template>
  <master-section :form-store="formStore" :form-type="formType" />
  <div class="row q-mt-md q-col-gutter-md">
    <div class="col-md-4">
      <select-product :form-store="formStore" :form-type="formType" />
    </div>
    <div class="col-md-8">
      <detail-section :form-store="formStore" :form-type="formType" />
    </div>
  </div>
</template>

<script setup>
  import SelectProduct from "./v2/SelectProduct.vue";
  import MasterSection from "./v2/MasterSection.vue";
  import DetailSection from "./v2/DetailSectionTable.vue";

  const props = defineProps({
    formStore: Object,
    formType: Object,
  });
</script>
