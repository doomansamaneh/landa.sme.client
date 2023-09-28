<template>
  <q-page-sticky
    class="z-1 q-pa-sm"
    position="bottom-right"
  >
    <q-badge class="q-px-sm q-py-sm"><span class="text-body2">{{ $t('shared.labels.today') }}: {{
      date.toLocaleDateString("fa-IR", options) }}</span>
    </q-badge>
  </q-page-sticky>
</template>

<script setup>
const date = new Date()
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric"
}
</script>
