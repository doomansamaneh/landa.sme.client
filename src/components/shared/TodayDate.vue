<template>
  <!-- <q-page-sticky
    class="z-1 q-pa-sm"
    position="bottom-right"
  > -->
  <span class="text-caption text-on-dark">
    <!-- {{ $t('shared.labels.today') }}: -->
    {{ date.toDayString() }} -
    {{ date.toDateString() }}</span>
  <!-- </q-page-sticky> -->
</template>

<script setup>
import "src/helpers/extensions";
const date = new Date()
</script>
