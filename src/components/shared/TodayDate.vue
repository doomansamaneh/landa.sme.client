<template>
  <!-- <q-page-sticky
    class="z-1 q-pa-sm"
    position="bottom-right"
  > -->
  <span class="text-caption text-on-dark">{{ $t('shared.labels.today') }}: {{
    date.toLocaleDateString("fa-IR", weekday) }} - {{ date.toLocaleDateString("fa-IR", fullDate) }}</span>
  <!-- </q-page-sticky> -->
</template>

<script setup>
const date = new Date()
const fullDate = {
  year: "numeric",
  month: "numeric",
  day: "numeric"
}

const weekday = {
  weekday: "long"
}
</script>
