<template>
  <q-card class="form-container">
    <q-card-section>
      <master-section :form-store="formStore" />
      <div class="q-mt-md">
        <detail-section :form-store="formStore" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import MasterSection from "./v1/MasterSection.vue";
import DetailSection from "./v1/DetailSectionTable.vue";

const props = defineProps({
  formStore: Object,
});
</script>
