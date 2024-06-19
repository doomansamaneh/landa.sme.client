<template>
  <span class="text-bold">حساب معین:</span>
  <span class="text-body1 no-letter-spacing q-mx-md">
    {{ model.code }} / {{ model.title }}
  </span>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
