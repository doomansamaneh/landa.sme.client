<template>
  <q-btn
    size="11px"
    round
    unelevated
    @click="tableStore?.toggleSeparator"
  >
    <q-icon size="20px" name="format_underlined" />
    <q-tooltip
      :delay="700"
      class="custom-tooltip"
      :anchor="
        tableStore?.separator.value ? 'bottom end' : 'bottom middle'
      "
      :self="tableStore?.separator.value ? 'top end' : 'top middle'"
    >
      <div class="text-body2 no-letter-spacing">
        <template v-if="tableStore?.separator.value === 'none'">
          خط‌ دار
        </template>
        <template v-else>بدون خط</template>
      </div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    tableStore: Object,
  });
</script>
