<template>
  <menu-button
    icon="o_add"
    :title="$t('shared.labels.create')"
    :to="to"
  />
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";

  const props = defineProps({
    to: String,
  });
</script>
