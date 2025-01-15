<template>
  <q-card>
    <div :ref="printStore.printRef">
      <header-section />
      <body-section />
    </div>
  </q-card>
</template>

<script setup>
  import { usePrint } from "src/composables/usePrint";
  
  import HeaderSection from "./HeaderSection.vue";
  import BodySection from "./BodySection.vue";

  const printStore = usePrint();
</script>
