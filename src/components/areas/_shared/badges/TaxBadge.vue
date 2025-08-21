<template>
  <span v-if="taxId" class="q-pl-xs">
    <q-icon name="o_check" color="accent" size="xs">
      <q-tooltip class="accent text-body1">
        {{ $t("shared.labels.taxSystemSent") }}
      </q-tooltip>
    </q-icon>
  </span>
</template>

<script setup>
  const props = defineProps({
    taxId: String,
  });
</script>
