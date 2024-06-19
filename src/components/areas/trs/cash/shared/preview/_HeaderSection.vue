<template>
  <span class="text-bold">صندوق:</span>
  <span class="text-body1 q-mx-md">
    {{ model.slTitle }} / {{ model?.title }}
  </span>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
