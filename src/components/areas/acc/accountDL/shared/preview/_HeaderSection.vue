<template>
  <span class="text-bold">{{ $t("shared.columns.dlTitle") }}:</span>
  <span class="text-body1 q-mx-md">
    {{ model.code }} / {{ model.title }}
  </span>
</template>

<script setup>
  const props = defineProps({
    model: Object,
  });
</script>
