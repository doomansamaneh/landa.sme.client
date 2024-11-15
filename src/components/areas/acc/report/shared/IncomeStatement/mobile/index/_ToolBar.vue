<template>
  <tool-bar :title="title" :base-route="baseRoute">
    <template #buttons>
      <menu-button-print />
    </template>
  </tool-bar>
</template>

<script setup>
  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuButtonPrint from "src/components/shared/buttons/MenuButtonPrint.vue";

  const props = defineProps({
    baseRoute: String,
    title: String,
  });
</script>
