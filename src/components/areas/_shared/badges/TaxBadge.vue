<template>
  <span v-if="taxId" class="q-pl-xs">
    <q-icon name="o_check" color="accent" size="xs">
      <q-tooltip class="accent text-body1 no-letter-spacing">
        ارسال به سامانه مودیان
      </q-tooltip>
    </q-icon>
  </span>
</template>

<script setup>
  const props = defineProps({
    taxId: String,
  });
</script>
