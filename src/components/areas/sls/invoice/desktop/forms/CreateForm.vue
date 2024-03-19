<template>
  <!-- <q-card>
        <q-card-section> </q-card-section>
      </q-card> -->
  <!-- <q-card-section>
      </q-card-section> -->
  <master-section :form-store="formStore" />
  <div class="q-mt-md">
    <detail-section :form-store="formStore" />
  </div>
</template>

<script setup>
import MasterSection from "./v1/MasterSection.vue";
import DetailSection from "./v1/DetailSectionTable.vue";

const props = defineProps({
  formStore: Object,
});
</script>
