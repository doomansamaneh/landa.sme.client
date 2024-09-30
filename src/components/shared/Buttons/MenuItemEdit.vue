<template>
  <sheet-item
    icon="o_edit"
    :title="$t('shared.labels.edit')"
    :to="to"
  />
</template>
<script setup>
  import SheetItem from "./MenuItem.vue";

  const props = defineProps({
    to: String,
  });
</script>
