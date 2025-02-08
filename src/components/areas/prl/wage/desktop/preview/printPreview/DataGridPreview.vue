<template>
  <div :ref="printStore.printRef">
    <header-section :title="title" />
    <body-section :wage-id="wageId" />
  </div>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint";

  import HeaderSection from "src/components/shared/dataTables/printPreview/HeaderSection.vue";
  import BodySection from "./BodySection.vue";

  const props = defineProps({
    title: String,
    wageId: String,
    tableStore: Object,
  });

  const printStore = usePrint();
</script>
