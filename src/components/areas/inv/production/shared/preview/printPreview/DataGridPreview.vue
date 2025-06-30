<template>
  <div :ref="printStore.printRef">
    <div v-if="!model" class="text-center q-pa-lg">
      <q-spinner size="52px" color="primary" />
      <div class="text-body1 q-mt-md">در حال بارگذاری...</div>
    </div>
    <div v-else>
      <header-section :model="model" :title="title" />
      <body-section :model="model" />
    </div>
  </div>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint";

  import HeaderSection from "./HeaderSection.vue";
  import BodySection from "./BodySection.vue";

  const props = defineProps({
    model: Object,
    title: String,
  });

  const printStore = usePrint();
</script>
