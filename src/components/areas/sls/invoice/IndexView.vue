<template>
  <desktop v-if="$q.screen.gt.sm" />
  <mobile v-if="$q.screen.xs" />
  <mobile />
</template>

<script setup>
import desktop from "src/components/areas/sls/invoice/desktop/IndexView.vue"
import mobile from "src/components/areas/sls/invoice/mobile/IndexView.vue"
</script>
