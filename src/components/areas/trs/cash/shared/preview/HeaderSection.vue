<template>
  <div class="row q-mb-sm">
    <span class="col-1">صندوق:</span>
    <span class="text-body1 q-mx-md">
      {{ model.title }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
