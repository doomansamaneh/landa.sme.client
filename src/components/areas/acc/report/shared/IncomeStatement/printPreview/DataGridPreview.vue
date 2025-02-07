<template>
  <div :ref="printStore.printRef">
    <header-section :title="title" />
    <body-section />
  </div>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint";

  import HeaderSection from "src/components/shared/dataTables/printPreview/HeaderSection.vue";
  import BodySection from "./BodySection.vue";

  const props = defineProps({
    title: String,
  });

  const printStore = usePrint();
</script>
