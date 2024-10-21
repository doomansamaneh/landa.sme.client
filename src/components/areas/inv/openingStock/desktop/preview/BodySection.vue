<template>
  <reposition-items :model="model" />
</template>

<script setup>
  import RepositionItems from "src/components/areas/_shared/preview/RepositionItems.vue";

  const props = defineProps({
    model: Object,
  });
</script>
