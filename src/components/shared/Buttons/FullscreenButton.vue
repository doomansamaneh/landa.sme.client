<template>
  <div class="flex items-center">
    <q-btn
      :disable="tableStore?.showLoader?.value"
      no-caps
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
            {{ $t("shared.labels.exitFullscreen") }}
          </template>
          <template v-else>
            {{ $t("shared.labels.fullscreen") }}
          </template>
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
