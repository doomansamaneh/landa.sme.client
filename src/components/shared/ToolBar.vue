<template>
  <mobile
    v-if="$q.screen.xs"
    :title="title"
    :base-route="baseRoute"
    :table-store="tableStore"
    :crud-store="crudStore"
    :activation="activation"
    :back-button="backButton"
    :buttons="buttons"
  ></mobile>
  <desktop
    v-else
    :title="title"
    :base-route="baseRoute"
    :table-store="tableStore"
    :crud-store="crudStore"
    :activation="activation"
    :back-button="backButton"
    :buttons="buttons"
    :inside="inside"
  >
  <template #buttons>

  </template>
  </desktop>
</template>

<script setup>
  import desktop from "src/components/shared/ToolBarDesktop.vue";
  import mobile from "src/components/shared/ToolBarMobile.vue";

  const props = defineProps({
    title: String,
    baseRoute: String,
    tableStore: Object,
    crudStore: Object,
    activation: Boolean,
    backButton: Boolean,
    buttons: Boolean,
    inside: Boolean
  });
</script>
