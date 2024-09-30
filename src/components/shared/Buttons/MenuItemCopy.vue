<template>
  <sheet-item
    icon="o_copy"
    :title="$t('shared.labels.copy')"
    :to="to"
  />
</template>
<script setup>
  import SheetItem from "./MenuItem.vue";

  const props = defineProps({
    to: String,
  });
</script>
