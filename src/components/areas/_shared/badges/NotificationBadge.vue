<template>
  <span v-if="count">
    <q-icon name="o_email" color="positive" size="20px">
      <q-tooltip class="positive text-body1">
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
