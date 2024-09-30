<template>
  <menu-button
    icon="o_copy"
    :title="$t('shared.labels.copy')"
    :to="to"
  />
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";

  const props = defineProps({
    to: String,
  });
</script>
