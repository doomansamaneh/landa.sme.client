<template>
  <menu-button
    icon="o_edit"
    :title="$t('shared.labels.edit')"
    :to="to"
  />
</template>
<script setup>
  import MenuButton from "./MenuButton.vue";

  const props = defineProps({
    to: String,
  });
</script>
