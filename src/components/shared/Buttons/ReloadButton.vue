<template>
  <q-btn size="11px" round unelevated @click="tableStore?.reloadData">
    <q-icon size="24px" name="o_refresh" />
    <q-tooltip :delay="700" class="custom-tooltip">
      <div class="text-body2 no-letter-spacing">تازه‌سازی</div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    tableStore: Object,
  });
</script>
