<template>
  <q-btn
    :disable="tableStore.showLoader.value"
    no-caps
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
      <div class="text-body2">
        <template v-if="tableStore?.separator.value === 'none'">
          {{ $t("shared.labels.separatorOn") }}
        </template>
        <template v-else>{{ $t("shared.labels.separatorOff") }}</template>
      </div>
    </q-tooltip>
  </q-btn>
</template>

<script setup>
  const props = defineProps({
    tableStore: Object,
  });
</script>
