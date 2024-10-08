<template>
  <span v-if="count" class="q-pl-xs">
    <q-icon name="o_email" color="positive" size="xs">
      <q-tooltip class="positive text-body1 no-letter-spacing">
        فرستاده شده: {{ count }}
      </q-tooltip>
    </q-icon>
  </span>
</template>

<script setup>
  const props = defineProps({
    count: Number,
  });
</script>
