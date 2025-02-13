<template>
  <div class="flex items-center">
    <q-btn
      size="11px"
      round
      unelevated
      @click="tableStore?.toggleFullscreen"
    >
      <q-icon
        size="24px"
        :name="
          tableStore?.inFullscreen.value
            ? 'fullscreen_exit'
            : 'fullscreen'
        "
      />
      <q-tooltip
        :delay="700"
        class="custom-tooltip"
        :anchor="
          tableStore?.inFullscreen.value
            ? 'bottom end'
            : 'bottom middle'
        "
        :self="
          tableStore?.inFullscreen.value ? 'top end' : 'top middle'
        "
      >
        <div class="text-body2">
          <template v-if="tableStore?.inFullscreen.value">
            خروج از تمام صفحه
          </template>
          <template v-else>تمام صفحه</template>
        </div>
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup>
  const props = defineProps({
    tableStore: Object,
  });
</script>
